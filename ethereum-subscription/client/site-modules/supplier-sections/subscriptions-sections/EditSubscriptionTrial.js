import React from 'react';
import {Segment} from "semantic-ui-react";
import EditSubscriptionForm from "../../forms/EditSubscriptionForm";
import SubscriptionContract from "../../../../services/smart-contracts/SubscriptionContract";

export default ({editContract, user, web3}) => {
    //TODO: Fill with viewTrialSubscriptionDetails as defaults

    const handleTrialEdited = (state) => {
        const {
            username,
            password,
            other,
            duration
        } = state;

        const subscriptionContract = new SubscriptionContract({
            address: editContract.address,
            web3
        });

        return subscriptionContract.setTrialSubscriptionDetails({
            supplierAddress: user.walletAddress,
            supplierEmail: user.email,
            username,
            password,
            other,
            trialDurationInDays: duration
        });
    };

    const handleTrialActivated = () => {
        const subscriptionContract = new SubscriptionContract({
            address: editContract.address,
            web3
        });

        return subscriptionContract.startTheTrial({
            supplierAddress: user.walletAddress
        });
    };

    return (
        <Segment padded>
            <div className="container-5">
                <EditSubscriptionForm
                    title="Edit Subscription Trial"
                    onSubmit={handleTrialEdited}
                    showActivate={editContract.trialInfoShared}
                    onActivate={handleTrialActivated}
                    activateButtonText="Start the Trial"
                    labels={{
                        username: 'Trial username:',
                        password: 'Trial password:',
                        duration: 'Trial duration (in days):',
                    }}
                />
            </div>
        </Segment>
    );
};