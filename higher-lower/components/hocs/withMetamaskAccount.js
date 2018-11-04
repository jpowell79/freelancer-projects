import React, {Component} from "react";
import Web3 from "../../services/smart-contracts/Web3";
import {getChildProps} from "../../services/utils";
import {updateMetamaskAccount} from "../../redux/actions";
import {connect} from "react-redux";
import AlertOptionPane from "../Alert/AlertOptionPane";

export default (Component) => {
    class MetamaskAccount extends Component {
        static mapStateToProps = ({metamaskAccount}) => ({metamaskAccount});

        static async getInitialProps (appContext){
            return await getChildProps(Component, appContext);
        }

        subscribeToAccountUpdate = () => {
            this.handleAccountUpdate = (data) => {
                const address = (!data.selectedAddress)
                    ? null : data.selectedAddress.toLowerCase();
                const accountAddress = (!this.props.metamaskAccount.address)
                    ? null : this.props.metamaskAccount.address.toLowerCase();

                if(address !== accountAddress){
                    return this.dispatchUpdateAccount();
                }
            };

            this.web3.onMetamaskUpdate(this.handleAccountUpdate);
        };

        dispatchUpdateAccount = async () => {
            return this.web3.fetchAccount().then(account => {
                this.props.dispatch(updateMetamaskAccount(account));
            }).catch(err => {
                console.error(err);
                this.props.dispatch(updateMetamaskAccount({}));
            });
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
            this.web3 = Web3.getInstance();

            if(this.isModernDappBrowser()){
                const hasPermission = await this.askForPermission();

                if(hasPermission){
                    await this.dispatchUpdateAccount();
                    this.subscribeToAccountUpdate();
                }
            } else if(this.isLegacyDappBrowser()) {
                await this.dispatchUpdateAccount();
                this.subscribeToAccountUpdate();
            }
        }

        componentWillUnmount(){
            this.unsubscribeToAccountUpdate();
        }

        render(){
            return <Component metamaskAccount={this.props.metamaskAccount}/>;
        }
    }

    return connect(MetamaskAccount.mapStateToProps)(MetamaskAccount);
};