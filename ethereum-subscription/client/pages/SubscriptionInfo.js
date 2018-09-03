import React, {Component} from 'react';
import {compose} from 'redux';
import {paths} from '../../services/constants';
import validation from '../../services/validation';
import strings from '../../services/strings';
import Page from '../containers/Page'
import FullWidthSegment from "../containers/FullWidthSegment";
import {Loader} from "../modules/icons";
import {Segment, Message} from 'semantic-ui-react';
import withSubscriptionContracts from '../hocs/withSubscriptionContracts';
import withMetamaskAccount from '../hocs/withMetamaskAccount';
import {USE_DUMMY_SUBSCRIPTION_DATA} from "../clientSettings";
import {SubscriptionDetails} from "../site-modules/SubscriptionDetails";
import objects from "../../services/objects";
import AddSubscriptionForm from "../site-modules/forms/AddSubscriptionForm";
import AlertOptionPane from "../services/Alert/AlertOptionPane";
import {connect} from 'react-redux';
import etherscan from '../../services/etherscan';
import {loadServerDataIntoStoreFromClient} from "../services/loadServerDataIntoStore";
import SubscriptionContract from "../../services/smart-contracts/SubscriptionContract";
import withMountObserver from "../hocs/withMountObserver";

class SubscriptionInfo extends Component {
    static mapStateToProps = ({settings, subscribers, subscriptions, users}) => ({
        settings, subscribers, subscriptions, users
    });

    static async getInitialProps({res, query}) {
        if(strings.isDefined(validation.getEthereumAddressError(query.address))){
            paths.redirect(paths.pages.index, res);
            return {};
        }

        return {
            address: query.address
        };
    }

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            showSubscriptionAlert: false,
            ownerUser: {}
        };
    }

    componentDidMount(){
        this.props.subscriptionContractLoader.loadContracts(contract => (
            contract.address.toLowerCase() === this.props.address.toLowerCase() &&
            contract.isActive
        )).then(contracts => {
            const contract = (contracts && contracts.length > 0) ? contracts[0] : {};

            if(this.props.isMounted){
                this.setState({
                    isLoading: false,
                    ownerUser: this.props.users.filter(user =>
                        user.username === contract.ownerUsername
                    )[0]
                });
            }
        }).catch(console.error);
    }

    handleAddSubscriptionFormSubmit = (event, removeAlert, disableAlert) => {
        if(this.addSubscriptionForm.hasFieldErrors()) return;

        disableAlert()
            .then(() => this.addSubscriptionForm.onSubmit())
            .then(transaction => {
                console.log(transaction);

                AlertOptionPane.showSuccessAlert({
                    title: 'Subscription Request Sent',
                    titleIcon: null,
                    htmlMessage: (
                        <Message
                            header="Your subscription request has been sent successfully!"
                            list={[
                                <li key={transaction.transactionHash}>
                                    Transaction Hash: <p className="bold"><a
                                    target="_blank"
                                    style={{
                                        wordBreak: "break-all"
                                    }}
                                    href={
                                        etherscan.getTransactionUrl(
                                            this.props.settings.etherScanUrl.value,
                                            transaction.transactionHash
                                        )
                                    }>{transaction.transactionHash}</a></p>
                                </li>,
                                'The supplier has been notified of your request. You will ' +
                                'receive an email within 24 hours.'
                            ]}
                        />
                    )
                });

                removeAlert();
            })
            .then(() => loadServerDataIntoStoreFromClient(this.props.dispatch, {
                subscribers: true,
                subscriptions: true
            }))
            .catch(err => {
                console.error(err);

                AlertOptionPane.showErrorAlert({
                    title: 'Subscription Cancelled',
                    message: 'Something went wrong during the transaction'
                });

                removeAlert();
            });
    };

    handleCancelSubscription = (contract) => {
        const subscriptionContract = new SubscriptionContract({
            web3: this.props.web3,
            address: contract.address
        });

        return subscriptionContract.cancelSubscription({
            subscriberOrSupplier: this.props.metamaskAccount.address
        }).then(() => {
            //TODO: Safely delete subscription from database.
            AlertOptionPane.showSuccessAlert({
                message: 'The subscription was cancelled successfully!'
            });
        }).catch(() => {
            AlertOptionPane.showErrorAlert({
                message: 'Something went wrong when trying to cancel the subscription'
            });
        })
    };

    handleSubscribe = (contract) => {
        if(objects.isEmpty(this.props.metamaskAccount)){
            AlertOptionPane.showInfoAlert({
                message: "You need to login to metamask in order to make a subscription"
            });

            return;
        }

        AlertOptionPane.showSuccessAlert({
            title: `Subscribe to ${contract.subscriptionName}`,
            titleIcon: null,
            htmlMessage: (
                <AddSubscriptionForm
                    ref={form => {this.addSubscriptionForm = form;}}
                    contract={contract}
                    metamaskAccount={this.props.metamaskAccount}
                    users={this.props.users}
                    web3={this.props.web3}
                />
            ),
            onCancel: (event, removeAlert) => removeAlert(),
            onConfirm: this.handleAddSubscriptionFormSubmit
        });
    };

    isSubscriberOfContract = () => {
        const contract = this.props.liveSubscriptionContracts[0];
        const subscribers = this.props.subscribers.filter(subscriber =>
            subscriber.walletAddress === this.props.metamaskAccount.address
        );
        const subscriber = (subscribers[0]) ? subscribers[0] : {};
        const subscriptions = this.props.subscriptions.filter(subscription =>
            subscription.contractId === contract.id
        );

        return subscriptions.filter(subscription =>
            subscription.subscriberId === subscriber.id
        ).length > 0;
    };

    render(){
        if(this.state.isLoading || this.props.metamaskAccount.isLoading) {
            return (
                <Page>
                    <FullWidthSegment className="gray" wrapper={1}>
                        <Segment padded>
                            <Loader/>
                        </Segment>
                    </FullWidthSegment>
                </Page>
            );
        }

        const contract = this.props.liveSubscriptionContracts[0];

        return (
            <Page>
                <FullWidthSegment className="gray" wrapper={1}>
                    <Segment padded>
                        {!contract
                            ? (
                                <p className="text text-center">
                                    A contract with the given address could not be found.
                                </p>
                            ) : (
                                <SubscriptionDetails
                                    {...contract}
                                    isOwner={
                                        this.state.ownerUser.walletAddress ===
                                        this.props.metamaskAccount.address
                                    }
                                    isSubscriber={this.isSubscriberOfContract()}
                                    onSubscribe={() => this.handleSubscribe(contract)}
                                    onCancelSubscription={() => this.handleCancelSubscription(contract)}
                                />
                            )
                        }
                    </Segment>
                </FullWidthSegment>
            </Page>
        );
    }
}

export default compose(
    withMountObserver,
    withSubscriptionContracts({
        useDummyData: USE_DUMMY_SUBSCRIPTION_DATA
    }),
    withMetamaskAccount,
    connect(SubscriptionInfo.mapStateToProps)
)(SubscriptionInfo);