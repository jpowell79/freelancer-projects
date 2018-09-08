import React from 'react';
import {Message, Segment} from "semantic-ui-react";
import EditSubscriptionForm from "../../forms/EditSubscriptionForm";
import SubscriptionContract from "../../../../services/smart-contracts/SubscriptionContract";
import Dispatcher from "../../../services/loaders/Dispatcher";
import {selectEditContract} from "../../../redux/actions";

export default ({editContract, subscriptionDetails, user, web3}) => {
    const subscriptionContract = new SubscriptionContract({
        address: editContract.address,
        web3
    });

    const handleSubscriptionEdited = (state) => {
        const {
            username,
            password,
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
            password,
            other
        });
    };

    const handleSubscriptionActivate = () => {
        return subscriptionContract.startTheSubscription({
            supplierAddress: user.walletAddress
        });
    };

    return (
        <Segment padded>
            <div className="container-5">
                {(editContract.subscriptionActive) && (
                    <Message
                        success
                        header="This subscription is currently active"
                    />
                )}
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