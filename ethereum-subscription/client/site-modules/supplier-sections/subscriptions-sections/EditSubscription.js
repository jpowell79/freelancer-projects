import React from 'react';
import {Segment} from "semantic-ui-react";
import EditSubscriptionForm from "../../forms/EditSubscriptionForm";
import SubscriptionContract from "../../../../services/smart-contracts/SubscriptionContract";

export default ({editContract, user, web3}) => {
    //TODO: Fill with viewFullSubscriptionDetails as defaults

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
        const subscriptionContract = new SubscriptionContract({
            address: editContract.address,
            web3
        });

        return subscriptionContract.startTheSubscription({
            supplierAddress: user.walletAddress
        });
    };

    return (
        <Segment padded>
            <div className="container-4">
                <EditSubscriptionForm
                    onSubmit={handleSubscriptionEdited}
                    showActivate={!editContract.subscriptionActive}
                    onActivate={handleSubscriptionActivate}
                />
            </div>
        </Segment>
    );
};