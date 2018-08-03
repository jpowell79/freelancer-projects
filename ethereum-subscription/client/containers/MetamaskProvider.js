import React, {Component} from 'react';
import Dispatcher from '../services/Dispatcher';
import {connect} from 'react-redux';
import {Loader} from "../modules/icons";
import Web3 from "../../services/Web3";
import PropTypes from 'prop-types';
import objects from '../../services/objects';
import HideFragment from './HideFragment';

/**
 * Will rerender whenever metamaskAccount changes occurs in metamask and
 * share the metamaskAccount information with all children.
 */
class MetamaskProvider extends Component {
    static mapStateToProps = ({metamaskAccount}) => ({metamaskAccount});

    static propTypes = {
        loadingRenderer: PropTypes.func,
        notFoundRenderer: PropTypes.func
    };

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
        const {
            metamaskAccount,
            loadingRenderer,
            notFoundRenderer,
            children
        } = this.props;

        if(this.props.metamaskAccount.isLoading){
            return (loadingRenderer)
                ? this.props.loadingRenderer(children)
                : (
                    <div className="text-center">
                        <Loader/>
                        <h3>Listening for account changes...</h3>
                    </div>
                );
        }

        if(objects.isEmpty(metamaskAccount)){
            return (
                <HideFragment>
                    {(notFoundRenderer)
                        ? notFoundRenderer(children)
                        : React.cloneElement(children, {metamaskAccount, web3: this.web3})}
                </HideFragment>
            );

        }

        return React.cloneElement(children, {metamaskAccount, web3: this.web3});
    }
}

export default connect(MetamaskProvider.mapStateToProps)(MetamaskProvider);