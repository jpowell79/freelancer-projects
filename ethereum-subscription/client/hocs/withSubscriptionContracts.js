import React, {Component} from 'react';
import SubscriptionContract from '../../services/smart-contracts/SubscriptionContract';
import Web3 from '../../services/Web3';
import {connect} from 'react-redux';

export default (maxLoad = -1) => (Module) => {
    class SubscriptionContractProvider extends Component {
        static mapStateToProps = ({subscriptionContracts}) => ({subscriptionContracts});

        state = {
            isLoadingSubscriptionContracts: false,
            liveSubscriptionContracts: []
        };

        componentDidMount(){
            if(maxLoad < 0){
                this.loadContracts(0, this.props.subscriptionContracts.length);
            } else {
                this.loadContracts(0, maxLoad)
            }
        }

        loadContracts = (start, end) => {
            if(!window.web3) return;

            if(!this.web3){
                this.web3 = new Web3(window.web3.currentProvider);
            }

            this.setState({isLoadingSubscriptionContracts: true});

            return Promise.all(
                this.props.subscriptionContracts
                    .filter((contract, i) => (i >= start) && (i <= end))
                    .map(contract => {
                        const subscriptionContract = new SubscriptionContract({
                            web3: this.web3,
                            address: contract.address
                        });

                        return subscriptionContract.fetchSubscriptionData();
                    })
            ).then(data => {
                this.setState({
                    isLoadingSubscriptionContracts: false,
                    liveSubscriptionContracts: data
                });
            }).catch(err => {
                console.error(err);
                this.setState({isLoadingSubscriptionContracts: false});
            });
        };

        render(){
            return (
                <Module
                    {...this.props}
                    {...this.state}
                    loadContracts={this.loadContracts}
                />
            );
        }
    }

    return connect(SubscriptionContractProvider.mapStateToProps)(SubscriptionContractProvider);
};