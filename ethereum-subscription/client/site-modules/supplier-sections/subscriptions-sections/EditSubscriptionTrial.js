import React from "react";
import {Message, Segment} from "semantic-ui-react";
import EditSubscriptionForm from "../../forms/EditSubscriptionForm";
import SubscriptionContract from "../../../../services/smart-contracts/SubscriptionContract";
import Dispatcher from "../../../services/loaders/Dispatcher";
import {selectEditContract} from "../../../redux/actions";

export default ({editContract, trialSubscriptionDetails, dispatch, user, web3}) => {
    const subscriptionContract = new SubscriptionContract({
        address: editContract.address,
        web3
    });

    const handleTrialEdited = (state) => {
        const {
            username,
            contractPassword,
            other,
            duration
        } = state;

        return subscriptionContract.setTrialSubscriptionDetails({
            supplierAddress: user.walletAddress,
            supplierEmail: user.email,
            username,
            password: contractPassword,
            other,
            trialDurationInDays: duration
        });
    };

    const handleTrialActivated = () => {
        return subscriptionContract.startTheTrial({
            supplierAddress: user.walletAddress
        });
    };

    return (
        <Segment padded>
            <div className="container-5">
                {(editContract.trialActive) && (
                    <Message
                        info
                        header="This trial is currently active"
                    />
                )}
                <EditSubscriptionForm
                    title="Edit Subscription Trial"
                    disabled={editContract.trialActive}
                    onSubmit={handleTrialEdited}
                    showActivate={!editContract.trialActive}
                    onActivate={handleTrialActivated}
                    onActivated={() => dispatch(selectEditContract({
                        ...editContract,
                        trialActive: true
                    }))}
                    onEdited={() => new Dispatcher(dispatch)
                        .dispatchUpdateSubscriptionDetails({
                            subscriptionContract,
                            supplierAddress: user.walletAddress
                        })
                    }
                    activateButtonText="Start the Trial"
                    labels={{
                        username: "Trial username:",
                        contractPassword: "Trial password:",
                        duration: "Trial duration (in days):",
                    }}
                    defaults={{
                        username: trialSubscriptionDetails.trialUsername,
                        contractPassword: trialSubscriptionDetails.trialPassword,
                        other: trialSubscriptionDetails.trialOther,
                        duration: trialSubscriptionDetails.trialDurationInDays
                    }}
                />
            </div>
        </Segment>
    );
};