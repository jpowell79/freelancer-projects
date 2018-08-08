import React, {Component} from 'react';
import SubscriptionContract from '../../services/smart-contracts/SubscriptionContract';
import Web3 from '../../services/Web3';
import {connect} from 'react-redux';
import strings from '../../services/strings';
import {random} from '../../services/utils';

const generateDummySubscriptionContracts = (amount) =>{
    const subscriptionContracts = [];
    const subsriptionTypes = [
        'Gym Membership',
        'IPTV Subscription',
        'Magazine Subscription',
        'Website Membership',
        'Other'
    ];

    for(let i = 0; i < amount; i++){
        subscriptionContracts.push({
            index: i,
            type: subsriptionTypes[random(0, subsriptionTypes.length)],
            txHash: `0x${strings.generateRandom(40)}`,
            supplierName: `Supplier ${i}`,
            hasFreeTrials: (random(0, 2) === 1),
            admin: `0x${strings.generateRandom(40)}`,
            amountClaimedSoFar: random(0, 50),
            amountToClaim: random(0, 50),
            contractAddress: `0x${strings.generateRandom(40)}`,
            contractCreation: Date.now() - random(0, 1000 * 60 * 60 * 24 * 600),
            details: strings.generateRandom(100),
            exitFee: random(0, 50)/100,
            joiningFee: random(0, 50)/100,
            reputation: (random(0, 2) === 1) ? 0 : random(0, 551),
            subscriptionActive: (random(0, 50) === 10),
            subscriptionAmountToPay: random(0, 50)/100,
            subscriptionCancelled: random(0, 2) === 1,
            subscriptionFinishTime: random(0, 50),
            subscriptionLengthInWeeks: random(0, 50),
            subscriptionName: `Subscription ${i}`,
            subscriptionStartTime: Date.now() + random(0, 1000 * 60 * 60 * 24 * 100),
            supplierAddress: `0x${strings.generateRandom(40)}`,
            totalSubscriptionPrice: random(0, 50),
            trialActive: random(0, 2) === 1,
            trialDurationInDays: random(0, 50),
            trialFinishTime: random(0, 50),
            trialInfoShared: random(0, 2) === 1,
            trialPrice: random(0, 50)/100,
            trialStartTime: random(0, 50),
        });
    }

    return subscriptionContracts;
};

const defaultOptions = {
    maxLoad: -1,
    useDummyData: false,
    amountOfDummyDataToGenerate: 513
};

export default (options = {}) => (Module) => {
    const mergedOptions = Object.assign({}, defaultOptions, options);

    class SubscriptionContractProvider extends Component {
        static mapStateToProps = ({subscriptionContracts}) => ({subscriptionContracts});

        state = {
            isLoadingSubscriptionContracts: false,
            liveSubscriptionContracts: []
        };

        componentDidMount(){
            this.subscriptionContracts = (mergedOptions.useDummyData)
                ? generateDummySubscriptionContracts(mergedOptions.amountOfDummyDataToGenerate)
                : this.props.subscriptionContracts;

            if(mergedOptions.maxLoad < 0){
                this.loadContracts(0, this.subscriptionContracts.length-1);
            } else {
                this.loadContracts(0, mergedOptions.maxLoad-1);
            }
        }

        loadDummyContracts = (start, end) => {
            this.setState({
                liveSubscriptionContracts: this.subscriptionContracts.filter(
                    (contract, i) => (i >= start) && (i <= end)
                )
            });
        };

        loadContracts = (start, end) =>{
            if(mergedOptions.useDummyData) return this.loadDummyContracts(start, end);
            if(!window.web3) return;
            if(!this.web3) this.web3 = new Web3(window.web3.currentProvider);

            this.setState({isLoadingSubscriptionContracts: true});

            return Promise.all(
                this.props.subscriptionContracts
                    .filter((contract, i) => (i >= start) && (i <= end))
                    .map(contract =>{
                        const subscriptionContract = new SubscriptionContract({
                            web3: this.web3,
                            address: contract.address
                        });

                        return subscriptionContract.fetchSubscriptionData();
                    })
            ).then(data =>{
                console.log(data);
                this.setState({
                    isLoadingSubscriptionContracts: false,
                    liveSubscriptionContracts: data
                });
            }).catch(err =>{
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

    return (mergedOptions.useDummyData)
        ? SubscriptionContractProvider
        : connect(SubscriptionContractProvider.mapStateToProps)(SubscriptionContractProvider);
};