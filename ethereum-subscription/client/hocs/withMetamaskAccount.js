import React, {Component} from "react";
import Dispatcher from "../services/loaders/Dispatcher";
import {connect} from "react-redux";
import Web3 from "../../services/smart-contracts/Web3";
import {getChildProps} from "../services/utils";
import AlertOptionPane from "../services/Alert/AlertOptionPane";

export default (Module) => {
    class MetamaskAccount extends Component {
        static async getInitialProps (appContext){
            return await getChildProps(Module, appContext);
        }

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

        isModernDappBrowser = () => window.ethereum;

        isLegacyDappBrowser = () => window.web3;

        askForPermission = async () => {
            try {
                await ethereum.enable();
            } catch(err){
                AlertOptionPane.showInfoAlert({
                    message: (
                        "Please note that the site won't work properly without access " +
                        "to your metamask account."
                    )
                });
                console.error(err);
                return false;
            }

            return true;
        };

        async componentDidMount(){
            this.dispatcher = new Dispatcher(this.props.dispatch);

            if(this.isModernDappBrowser()){
                this.web3 = Web3.getInstance(window.ethereum);
                const hasPermission = await this.askForPermission();

                if(hasPermission){
                    await this.dispatcher.dispatchUpdateAccount(this.web3);
                    this.subscribeToAccountUpdate();
                }
            } else if(this.isLegacyDappBrowser()){
                this.web3 = Web3.getInstance(window.web3.currentProvider);
                this.subscribeToAccountUpdate();
                await this.dispatcher.dispatchUpdateAccount(this.web3);
            }
        }

        componentWillUnmount(){
            this.unsubscribeToAccountUpdate();
        }

        render(){
            return <Module {...this.props} web3={this.web3}/>
        }
    }

    return connect(MetamaskAccount.mapStateToProps)(MetamaskAccount);
};