import React, {Component} from 'react';
import Dispatcher from '../services/Dispatcher';
import {connect} from 'react-redux';
import Web3 from "../../services/Web3";

export default (Module) => {
    class Metamask extends Component {
        static mapStateToProps = ({metamaskAccount}) => ({metamaskAccount});

        subscribeToAccountUpdate = () => {
            this.handleAccountUpdate = (data) => {
                const address = (!data.selectedAddress)
                    ? null : data.selectedAddress.toLowerCase();
                const accountAddress = (!this.props.metamaskAccount.address)
                    ? null : this.props.metamaskAccount.address.toLowerCase();

                if(address !== accountAddress){
                    this.dispatcher.dispatchUpdateAccount(this.web3);
                }
            };

            if(this.web3.hasMetaMask()){
                this.web3.onMetamaskUpdate(this.handleAccountUpdate);
            }
        };

        unsubscribeToAccountUpdate = () => {
            if(this.web3.hasMetaMask()){
                this.web3.unsubscribeToMetmaskUpdate(this.handleAccountUpdate);
            }
        };

        componentDidMount(){
            if(window.web3){
                this.web3 = new Web3(window.web3.currentProvider);
                this.dispatcher = new Dispatcher(this.props.dispatch);
                this.dispatcher.dispatchUpdateAccount(this.web3);
                this.subscribeToAccountUpdate();
            }
        }

        componentWillUnmount(){
            this.unsubscribeToAccountUpdate();
        }

        render(){
            return <Module {...this.props}/>
        }
    }

    return connect(Metamask.mapStateToProps)(Metamask);
};