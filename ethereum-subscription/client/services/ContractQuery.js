class ContractQuery {
    constructor(liveSubscriptionContract){
        this.contract = liveSubscriptionContract;
    }

    getSubscriber = ({subscriptions, subscribers}) => {
        const subscription = subscriptions.find(subscription =>
            subscription.contractId === this.contract.id
        );
        const subscriberId = (subscription) ? subscription.subscriberId : null;
        return subscribers.find(subscriber => subscriber.id === subscriberId);
    };

    isSubscriber = ({subscriptions, subscribers, walletAddress}) => {
        const subscriber = subscribers.find(subscriber =>
            subscriber.walletAddress === walletAddress
        );
        const subscription = subscriptions.find(subscription =>
            subscription.contractId === this.contract.id
        );

        return (!subscriber || !subscriptions) ? false
            : (subscriber.id === subscription.subscriberId);
    };
}

export default ContractQuery;