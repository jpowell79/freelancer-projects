import React, {Component} from 'react';
import Dispatcher from '../services/Dispatcher';
import {connect} from 'react-redux';
import {Loader} from "../modules/icons";
import Web3 from "../../services/Web3";

/**
 * Will rerender whenever account changes occurs in metamask and
 * share the account information with all children.
 */
class MetamaskContainer extends Component {
    static mapStateToProps = ({account, settings}) => ({account, settings});

    subscribeToAccountUpdate = () => {
        this.handleAccountUpdate = (data) => {
            const address = (!data.selectedAddress)
                ? null : data.selectedAddress.toLowerCase();
            const accountAddress = (!this.props.account.address)
                ? null : this.props.account.address.toLowerCase();

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
        this.web3 = new Web3(window.web3.currentProvider);
        this.dispatcher = new Dispatcher(this.props.dispatch);
        this.dispatcher.dispatchUpdateAccount(this.web3);
        this.subscribeToAccountUpdate();
    }

    componentWillUnmount(){
        this.unsubscribeToAccountUpdate();
    }

    render(){
        if(this.props.account.isLoading){
            return <Loader/>;
        }

        return React.cloneElement(this.props.children, {account: this.props.account});
    }
}

export default connect(MetamaskContainer.mapStateToProps)(MetamaskContainer);