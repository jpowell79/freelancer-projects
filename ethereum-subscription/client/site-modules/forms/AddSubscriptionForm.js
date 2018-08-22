import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import SubscriptionContract from "../../../services/smart-contracts/SubscriptionContract";
import PropTypes from 'prop-types';
import email from '../../../services/api/email';
import subscriptions from '../../../services/api/subscriptions';
import withMessage from '../../hocs/withMessage';

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
        const supplier = this.props.users.filter(user =>
            user.username === contract.ownerUsername
        )[0];
        let transaction = {};

        this.props.setIsLoading({
            infoTitle: 'Waiting for transaction confirmation',
            info: [
                'Please allow up to 30 seconds for the transaction to ' +
                'be processed and written to the Ethereum blockchain.'
            ]
        });

        console.log(contract);

        //TODO: Figure out which method to call.
        return subscriptionContract.depositSubscription({
            subscriptionAmountToPay: contract.subscriptionAmountToPay,
            subscriberAddress: this.props.metamaskAccount.address
        }).then(transactionRes => {
            transaction = (transactionRes) ? transactionRes : {};
        }).then(() => subscriptions.addSubscription({
            subscriberAddress: this.props.metamaskAccount.address,
            contractAddress: contract.address
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
                            defaultValue={this.props.contract.joiningFee}
                            disabled
                        />
                    </Form.Field>
                </Form>
            </div>
        );
    }
}

export default withMessage(AddSubscriptionForm, {email: ''});

