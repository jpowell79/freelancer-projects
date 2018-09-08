import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import SubscriptionContract from "../../../services/smart-contracts/SubscriptionContract";
import PropTypes from 'prop-types';
import email from '../../../services/api/email';
import subscriptions from '../../../services/api/subscriptions';
import withMessage from '../../hocs/withMessage';
import {waitingForBlockchain} from "../../services/views/messages";
import {weiToEth} from "../../../services/utils";

class AddSubscriptionForm extends Component {
    static propTypes = {
        metamaskAccount: PropTypes.object.isRequired,
        contract: PropTypes.object.isRequired,
        users: PropTypes.array.isRequired,
        web3: PropTypes.object.isRequired
    };

    onSubmit = async () => {
        const contract = this.props.contract;
        const subscriptionContract = new SubscriptionContract({
            web3: this.props.web3,
            address: contract.address
        });
        const supplier = this.props.users.find(user =>
            user.username === contract.ownerUsername
        );
        let transaction = {};

        const depositFunction = (contract.trialInfoShared)
            ? subscriptionContract.depositTrialFee
            : subscriptionContract.depositSubscription;

        return this.props.setIsLoading(waitingForBlockchain)
            .then(() => depositFunction({
                subscriberAddress: this.props.metamaskAccount.address
            })).then(transactionRes => {
                console.log(transactionRes);
                transaction = (transactionRes) ? transactionRes : {};
            }).then(() => subscriptions.addSubscription({
                subscriberAddress: this.props.metamaskAccount.address,
                contractAddress: contract.address,
                transactionHash: transaction.transactionHash
            })).then(() => email.sendRequestSubscriptionMails({
                subscriberEmail: this.props.messageState.email,
                supplierEmail: supplier.email,
                subscriptionName: contract.subscriptionName
            })).then(() => transaction);
    };

    render(){
        const {
            isLoading
        } = this.props.messageState;

        return (
            <div>
                {this.props.renderMessages()}
                <h4>
                    Please confirm the following details are correct before proceeding
                </h4>
                <Form>
                    <Form.Field>
                        <label>
                            Your contact email address is:
                        </label>
                        <input
                            type="text"
                            defaultValue={this.props.messageState.email}
                            disabled={isLoading}
                            onChange={event => {
                                this.props.setMessageState({
                                    email: event.target.value
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>
                            Your ethereum wallet address is:
                        </label>
                        <input
                            type="text"
                            disabled={true}
                            defaultValue={this.props.metamaskAccount.address}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>
                            The amount of Eth you will be sending is:
                        </label>
                        <input
                            type="text"
                            defaultValue={weiToEth(this.props.contract.amountToDeposit)}
                            disabled
                        />
                    </Form.Field>
                </Form>
            </div>
        );
    }
}

export default withMessage(AddSubscriptionForm, {email: ''});

