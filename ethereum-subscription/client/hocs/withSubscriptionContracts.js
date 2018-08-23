import React, {Component} from 'react';
import SubscriptionContract from '../../services/smart-contracts/SubscriptionContract';
import Web3 from '../../services/Web3';
import {connect} from 'react-redux';
import strings from '../../services/strings';
import {random} from '../../services/utils';
import {getChildProps} from "../services/utils";
import {FILTERABLE_SUBSCRIPTION_TYPES} from "../clientSettings";
import etherscan from '../../services/etherscan';

const generateDummySubscriptionContracts = (amount) => {
    const subscriptionContracts = [];
    const subsriptionTypes = [
        ...FILTERABLE_SUBSCRIPTION_TYPES,
        'Other',
        'Foobar'
    ];
    const users = [
        'admin',
        'smnrkssn',
        'supplier'
    ];

    for(let i = 0; i < amount; i++){
        const address = `0x${strings.generateRandom(40)}`;
        const username = (random(0, 5) === 2) ? users[random(0, users.length)] : `Supplier ${i}`;

        subscriptionContracts.push({
            index: i,
            isActive: true,
            type: subsriptionTypes[random(0, subsriptionTypes.length)],
            txHash: `0x${strings.generateRandom(40)}`,
            supplierName: username,
            ownerUsername: username,
            hasFreeTrials: (random(0, 2) === 1),
            admin: `0x${strings.generateRandom(40)}`,
            amountClaimedSoFar: random(0, 50),
            amountToClaim: random(0, 50),
            contractAddress: address,
            address: address,
            contractCreation: Date.now() - random(0, 1000 * 60 * 60 * 24 * 600),
            walletAge: strings.toDateString(new Date(
                Date.now() - random(0, 1000 * 60 * 60 * 24 * 900))
            ),
            details: strings.generateRandom(100),
            exitFee: random(0, 50)/100,
            joiningFee: random(0, 50)/100,
            reputation: users.includes(username) ? 0 : (random(0, 4) === 2) ? 0 : random(0, 551),
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
    useDummyData: false,
    amountOfDummyDataToGenerate: 513
};

export default (options = {}) => (Module) => {
    const mergedOptions = Object.assign({}, defaultOptions, options);

    class SubscriptionContractProvider extends Component {
        state = {contracts: []};
        dummyContracts = Array(mergedOptions.amountOfDummyDataToGenerate).fill({});
        web3 = null;

        static async getInitialProps (appContext){
            const moduleProps = await getChildProps(Module, appContext);
            return {...moduleProps};
        }

        static mapStateToProps = ({subscriptionContracts, subscriptionTypes, users}) => ({
            subscriptionContracts,
            subscriptionTypes,
            users
        });

        getDummyData = () => {
            if(window.__DUMMY_SUBSCRIPTION_CONTRACTS__){
                this.dummyContracts = window.__DUMMY_SUBSCRIPTION_CONTRACTS__;
                return this.dummyContracts;
            }

            this.dummyContracts = generateDummySubscriptionContracts(
                mergedOptions.amountOfDummyDataToGenerate
            );
            window.__DUMMY_SUBSCRIPTION_CONTRACTS__ = this.dummyContracts;

            return this.dummyContracts;
        };

        loadAllContracts = async (loadingOptions = {}) => {
            const dbContracts = (mergedOptions.useDummyData)
                ? this.getDummyData() : this.props.subscriptionContracts;
            const options = Object.assign({}, {
                amountToLoadPerBatch: dbContracts.length,
                startIndex: 0
            }, loadingOptions);

            let start = options.startIndex;
            let promises = [];
            const loadingFunction = (mergedOptions.useDummyData)
                ? this.loadDummyContracts : this.fetchContracts;

            while(start < dbContracts.length){
                promises.push(
                    loadingFunction(start, start + options.amountToLoadPerBatch - 1)
                        .then(data => {
                            this.setState(prevState => ({
                                contracts: [...prevState.contracts, ...data]
                            }))
                        })
                );
                start += options.amountToLoadPerBatch;
            }

            return Promise.all(promises).catch(this.handleError);
        };

        loadDummyContracts = (start, end) => {
            return Promise.resolve(this.getDummyData()
                .filter((contract, i) => (i >= start) && (i <= end)))
                .catch(this.handleError);
        };

        fetchAndMergeContract = (contract) => {
            if(!this.web3) this.web3 = new Web3(window.web3.currentProvider);

            const subscriptionContract = new SubscriptionContract({
                web3: this.web3,
                address: contract.address
            });

            let subscriptionData;

            return subscriptionContract.fetchSubscriptionData()
                .then(data => {
                    const subscriptionType = this.props.subscriptionTypes
                        .filter(type => type.id === contract.typeId)[0];
                    const user = this.props.users.filter(user =>
                        user.username === contract.ownerUsername
                    )[0];

                    subscriptionData = Object.assign({}, data, {
                        ...contract,
                        supplierName: contract.ownerUsername,
                        type: subscriptionType.name
                    });

                    return etherscan.getWalletAddressTransactions({
                        walletAddress: user.walletAddress
                    })
                })
                .then(transactions => {
                    const walletAge = (transactions.result[0])
                        ? strings.toDateString(transactions.result[0])
                        : "Unavailable";

                    return Object.assign({}, subscriptionData, {walletAge});
                });
        };

        handleError = (err) => {
            console.error(err);
            return err;
        };

        loadContracts = (comparator) => {
            if(mergedOptions.useDummyData){
                return Promise.resolve(
                    this.getDummyData().filter(comparator)
                ).then(contracts => {
                    this.setState({contracts});
                    return contracts;
                }).catch(this.handleError)
            }
            if(!window.web3) return Promise.resolve([]);

            return Promise.all(
                this.props.subscriptionContracts
                    .filter(comparator)
                    .map(this.fetchAndMergeContract)
            ).then(contracts => {
                this.setState({contracts});
                return contracts;
            }).catch(this.handleError);
        };

        fetchContracts = (start, end) => {
            if(mergedOptions.useDummyData) return this.loadDummyContracts(start, end);
            if(!window.web3) return Promise.resolve([]);

            return Promise.all(
                this.props.subscriptionContracts
                    .filter((contract, i) => (i >= start) && (i <= end))
                    .map(this.fetchAndMergeContract)
            );
        };

        render(){
            return (
                (mergedOptions.useDummyData)
                    ? (
                        <Module
                            {...this.props}
                            {...this.state}
                            loadAllContracts={this.loadAllContracts}
                            fetchContracts={this.fetchContracts}
                            subscriptionContracts={this.dummyContracts}
                            loadContracts={this.loadContracts}
                        />
                    )
                    : (
                        <Module
                            {...this.props}
                            {...this.state}
                            loadAllContracts={this.loadAllContracts}
                            fetchContracts={this.fetchContracts}
                            loadContracts={this.loadContracts}
                        />
                    )
            );
        }
    }

    return (mergedOptions.useDummyData)
        ? SubscriptionContractProvider
        : connect(SubscriptionContractProvider.mapStateToProps)(SubscriptionContractProvider);
};