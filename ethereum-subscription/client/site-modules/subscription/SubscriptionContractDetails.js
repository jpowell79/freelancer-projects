import React, {Fragment} from "react";
import {ProviderRating} from "../ProviderRating";
import {Grid, Message} from "semantic-ui-react";
import {weiToEth} from "../../../services/utils";
import {SubscriptionDetails} from "./SubscriptionDetails";
import {TrialSubscriptionDetails} from "./TrialSubscriptionDetails";
import strings from "../../../services/datatypes/strings";

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
    totalSubscriptionPrice,
    subscriptionLengthInWeeks,
    ...contract
}) => {
    return (
        <div className="wrapper-2">
            <div className="text-center">
                <h1 className="title">{
                    (subscriptionCancelled)
                        ? `${subscriptionName} has been cancelled`
                        : subscriptionName
                }</h1>
                <p className="text">Provided by: <strong>
                    <ProviderRating name={supplierName} reputation={reputation}/>
                </strong>
                </p>
                <h2>4 Week Price: {(subscriptionLengthInWeeks === 0) ? 0 : weiToEth(
                    totalSubscriptionPrice / subscriptionLengthInWeeks
                )} Eth</h2>
                <div className="wrapper-2 bold">
                    <Grid stackable columns={3}>
                        <Grid.Column>
                            <p className="text">Join Fee: {weiToEth(joiningFee)} Eth</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p className="text">Exit Fee: {weiToEth(exitFee)} Eth</p>
                        </Grid.Column>
                        <Grid.Column>
                            <p className="text nowrap">Free Trial: {hasFreeTrials ? "Yes" : "No"}</p>
                        </Grid.Column>
                    </Grid>
                    <Grid stackable columns={2}>
                        <Grid.Column>
                            <p className="text">
                                Contract length in weeks: {subscriptionLengthInWeeks}
                            </p>
                        </Grid.Column>
                        <Grid.Column>
                            <p className="text nowrap">
                                Total Eth to deposit: {weiToEth(totalSubscriptionPrice)}
                            </p>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
            {(strings.isDefined(details)) && (
                <Fragment>
                    <h2>Details:</h2>
                    <p className="text">{details}</p>
                </Fragment>
            )}
            {(isSubscriber || isOwner) && (
                <div>
                    {(subscriptionActive) && (
                        <SubscriptionDetails
                            {...contract}
                            subscriptionLengthInWeeks={subscriptionLengthInWeeks}
                        />
                    )}
                    {(trialActive) && (
                        <TrialSubscriptionDetails {...contract}/>
                    )}
                    {(!subscriptionActive && !trialActive && isSubscriber) && (
                        <div className="wrapper-4 mt-30">
                            <Message
                                info
                                header="Waiting for supplier to activate your subscription"
                                list={[
                                    ("Subscription information will appear here once the " +
                                     "supplier activates your subscription. This could take up " +
                                     "to 24 hours."),
                                    ("You will receive an email notification once the supplier " +
                                     "has activated your subscription."),
                                    ("If the supplier does not activate the subscription within " +
                                     "24 hours you will be eligible for a refund.")
                                ]}
                            />
                        </div>
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