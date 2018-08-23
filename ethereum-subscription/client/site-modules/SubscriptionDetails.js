import React from 'react';
import {ProviderRating} from "./ProviderRating";
import {Grid} from "semantic-ui-react";

export const SubscriptionDetails = ({
    subscriptionName,
    supplierName,
    reputation,
    joiningFee,
    exitFee,
    details,
    hasFreeTrials,
    isSubscriber,
    onSubscribe,
    onCancelSubscription
}) => {
    return (
        <div className="wrapper-2">
            <div className="text-center">
                <h1 className="title">{subscriptionName}</h1>
                <p className="text">Provided by: <strong>
                    <ProviderRating name={supplierName} reputation={reputation}/>
                </strong>
                </p>
                <h2>Monthly Price: </h2>
                <div className="wrapper-3 bold">
                    <Grid stackable columns={3}>
                        <Grid.Column>
                            <p className="text">Join Fee: {joiningFee} Eth</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p className="text">Exit Fee: {exitFee} Eth</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p className="text">Free Trial: {hasFreeTrials ? "Yes" : "No"}</p>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
            <h2>Details:</h2>
            <p className="text">{details}</p>
            <div className="text-center divider-2">
                {(!isSubscriber) ? (
                    <button className="ui huge primary button" onClick={onSubscribe}>
                        Subscribe
                    </button>
                ) : (
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