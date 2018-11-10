import React from "react";
import {Message, Segment} from "semantic-ui-react";
import EditSubscriptionForm from "../../forms/EditSubscriptionForm";
import SubscriptionContract from "../../../../services/smart-contracts/SubscriptionContract";
import Dispatcher from "../../../services/loaders/Dispatcher";
import {selectEditContract} from "../../../redux/actions";
import email from "../../../../services/api/email";
import ContractQuery from "../../../services/ContractQuery";
import {EditSubscriptionMessage} from "../../messages/EditSubscriptionMessage";

export default ({
    editContract,
    subscribers,
    subscriptions,
    subscriptionDetails,
    dispatch,
    user,
    web3
}) => {
    const subscriptionContract = new SubscriptionContract({
        address: editContract.address,
        web3
    });

    const handleSubscriptionEdited = (state) => {
        const {
            username,
            contractPassword,
            other
        } = state;

        const subscriptionContract = new SubscriptionContract({
            address: editContract.address,
            web3
        });

        return subscriptionContract.setFullSubscriptionDetails({
            supplierAddress: user.walletAddress,
            supplierEmail: user.email,
            username,
            password: contractPassword,
            other
        });
    };

    const handleSubscriptionActivate = async () => {
        let transaction = {};

        return subscriptionContract.startTheSubscription({
            supplierAddress: user.walletAddress
        }).then(transactionRes => {
            transaction = transactionRes;

            const subscriber = new ContractQuery(editContract)
                .getSubscriber({subscriptions, subscribers});
            const subscriberEmail = (subscriber) ? subscriber.email : null;

            if(!subscriberEmail){
                throw new Error("Could not find any subscriber associated with this subscription");
            }

            return email.sendSubscriptionStartedMail({
                contractAddress: editContract.address,
                supplierEmail: user.email,
                subscriptionName: editContract.subscriptionName,
                subscriberEmail: subscriberEmail
            });
        }).then(() => transaction);
    };

    return (
        <Segment padded>
            <div className="container-4">
                {(editContract.subscriptionActive) ? (
                    <Message
                        success
                        header="This subscription is currently active"
                    />
                ) : <EditSubscriptionMessage/>}
                <EditSubscriptionForm
                    onSubmit={handleSubscriptionEdited}
                    disabled={editContract.subscriptionActive}
                    showActivate={!editContract.subscriptionActive}
                    onActivate={handleSubscriptionActivate}
                    onActivated={() => dispatch(selectEditContract({
                        ...editContract,
                        subscriptionActive: true
                    }))}
                    onEdited={() => new Dispatcher(dispatch)
                        .dispatchUpdateSubscriptionDetails({
                            subscriptionContract,
                            supplierAddress: user.walletAddress
                        })
                    }
                    defaults={subscriptionDetails}
                />
            </div>
        </Segment>
    );
};