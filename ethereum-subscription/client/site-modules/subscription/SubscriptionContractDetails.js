import React from "react";
import {ProviderRating} from "../ProviderRating";
import {Grid} from "semantic-ui-react";
import {weiToEth} from "../../../services/utils";
import {SubscriptionDetails} from "./SubscriptionDetails";
import {TrialSubscriptionDetails} from "./TrialSubscriptionDetails";

export const SubscriptionContractDetails = ({
    subscriptionName,
    isOwner,
    subscriptionCancelled,
    supplierName,
    reputation,
    joiningFee,
    exitFee,
    details,
    hasFreeTrials,
    subscriptionActive,
    trialActive,
    isSubscriber,
    onSubscribe,
    onCancelSubscription,
    ...contract
}) => {
    return (
        <div className="wrapper-2">
            <div className="text-center">
                <h1 className="title">{
                    (subscriptionCancelled)
                        ? `${subscriptionName} has been cancelled by the supplier`
                        : subscriptionName
                }</h1>
                <p className="text">Provided by: <strong>
                    <ProviderRating name={supplierName} reputation={reputation}/>
                </strong>
                </p>
                <h2>Monthly Price: </h2>
                <div className="wrapper-3 bold">
                    <Grid stackable columns={3}>
                        <Grid.Column>
                            <p className="text">Join Fee: {weiToEth(joiningFee)} Eth</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p className="text">Exit Fee: {weiToEth(exitFee)} Eth</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p className="text">Free Trial: {hasFreeTrials ? "Yes" : "No"}</p>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
            <h2>Details:</h2>
            <p className="text">{details}</p>
            {(isSubscriber || isOwner) && (
                <div>
                    {(subscriptionActive) && (
                        <SubscriptionDetails {...contract}/>
                    )}
                    {(trialActive) && (
                        <TrialSubscriptionDetails {...contract}/>
                    )}
                </div>
            )}
            <div className="text-center divider-2">
                {(!isSubscriber && !isOwner && !subscriptionActive && !trialActive) && (
                    <button className="ui huge primary button" onClick={onSubscribe}>
                        Subscribe
                    </button>
                )}
                {((isSubscriber || isOwner) && (subscriptionActive || trialActive)) && (
                    <button
                        className="ui huge bg-color-uiRed color-white button"
                        onClick={onCancelSubscription}
                    >
                        Cancel Subscription
                    </button>
                )}
            </div>
        </div>
    );
};