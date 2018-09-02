const abi = require('./subscriptionContractAbi');
const {
    toMilliseconds,
    parseNumberStringsToNumbers,
    parseContractArrayToObject
} = require('./contractParser');
const {bindAllMethods} = require("../utils");

class SubscriptionContract {
    constructor({web3, address}){
        this.contract = new web3.eth.Contract(abi, address);
        this.methods = this.contract.methods;

        bindAllMethods(this, SubscriptionContract);
    }

    async fetchSubscriptionData(){
        return (
            this.callGetters(this.methods)
                .then(parseNumberStringsToNumbers)
                .then(parseContractArrayToObject)
        );
    };

    //region Admin only methods
    /**
     * @param subscriptionName
     * @param supplierWalletAddress
     * @param subscriptionLengthInWeeks
     * @param subscriptionPrice
     * @param joinFee The amount of Wei required to join the subscription.
     * @param exitFee The amount of Wei required to exit the subscription.
     * @param supplierEmail
     * @param details A string of other information about the subscription.
     * @returns {PromiEvent<any>}
     */
    async setSubscriptionDetails({
        subscriptionName,
        supplierWalletAddress,
        subscriptionLengthInWeeks,
        subscriptionPrice,
        joinFee,
        exitFee,
        supplierEmail,
        subscriptionDetails,
        admin
    }){
        return this.methods._amendDetails(
            subscriptionName,
            supplierWalletAddress,
            subscriptionLengthInWeeks,
            subscriptionPrice,
            joinFee,
            exitFee,
            supplierEmail,
            subscriptionDetails
        ).send({from: admin});
    };

    /**
     * Updates the wallet address for ALL smart contracts associated with the supplier.
     */
    async setSupplierWalletAddress({walletAddress, admin}){
        return this.methods._setSupplierWalletAddress(walletAddress)
            .send({from: admin});
    };
    //endregion

    //region Supplier only methods
    /**
     * @param subscriptionName
     * @param supplierWalletAddress
     * @param subscriptionLengthInWeeks
     * @param subscriptionPrice
     * @param joinFee The amount of Wei required to join the subscription.
     * @param exitFee The amount of Wei required to exit the subscription.
     * @param supplierEmail
     * @param subscriptionDetails A string of other information about the subscription.
     * @returns {PromiEvent<any>}
     */
    async setSubscriptionDetailsAsSupplier({
        subscriptionName,
        subscriptionLengthInWeeks,
        subscriptionPrice,
        joinFee,
        exitFee,
        supplierEmail,
        subscriptionDetails,
        supplier
    }){
        return this.methods._amendDetails(
            subscriptionName,
            subscriptionLengthInWeeks,
            subscriptionPrice,
            joinFee,
            exitFee,
            supplierEmail,
            subscriptionDetails
        ).send({from: supplier});
    };

    /**
     * Allows suppliers to add or amend details of the trial in the smart contract.
     * @param supplierAddress The suppliers wallet address.
     * @param supplierEmail The suppliers email.
     * @param username The suppliers username.
     * @param password The suppliers password.
     * @param other A string of other information about the subscription.
     * @param trialDurationInDays How long the trial duration is.
     * @returns {PromiEvent<any>}
     */
    async setTrialSubscriptionDetails({
        supplierAddress,
        supplierEmail,
        username,
        password,
        other,
        trialDurationInDays
    }){
        return this.methods.setTrialSubscriptionDetails(
            supplierEmail,
            username,
            password,
            other,
            trialDurationInDays
        ).send({
            from: supplierAddress
        });
    };

    /**
     * Can only be called after the subscription details have been set.
     */
    async startTheTrial({supplierAddress}){
        return this.methods.startTheTrial().call({
            from: supplierAddress
        });
    };

    /**
     * Can only be called after the trial is active.
     */
    async claimTrialPayment(){
        return this.methods.claimTrialPayment().call();
    };

    async setFullSubscriptionDetails({
        supplierEmail,
        username,
        password,
        other,
        supplierAddress
    }){
        return this.methods.setFullSubcriptionDetails(
            supplierEmail,
            username,
            password,
            other
        ).send({
            from: supplierAddress
        });
    };

    async startTheSubscription({supplierAddress}){
        return this.methods.startTheSubscription().call({
            from: supplierAddress
        });
    };

    async claimSubscriptionEth({supplierAddress}){
        return this.methods.claimSubscriptionEth().call({
            from: supplierAddress
        });
    };

    async viewTrialSubscriptionDetails({supplierAddress}){
        return this.methods.viewTrialSubscriptionDetails().call({
            from: supplierAddress
        });
    };

    async viewFullSubscriptionDetails({supplierAddress}){
        return this.methods.viewFullSubscriptionDetails().call({
            from: supplierAddress
        });
    };
    //endregion

    //region Subsciber only methods
    async depositTrialFee({trialPrice, subscriberAddress}){
        return this.methods.trialPrice().call()
            .then(trialPrice => this.methods.depositTrialFee().send({
                from: subscriberAddress,
                value: trialPrice
            }));
    };

    async depositSubscription({subscriberAddress}){
        return this.methods.amountToDeposit().call()
            .then(amountToDeposit => this.methods.depositSubscription().send({
                from: subscriberAddress,
                value: amountToDeposit
            }));
    };

    //endregion

    async cancelSubscription({subscriberOrSupplier}){
        return this.methods.cancelSubscription().send({
            from: subscriberOrSupplier
        });
    };

    async callGetters(methods){
        return Promise.all([
            methods.admin().call()
                .then(admin => ({admin})),
            methods.thisContractAddress().call()
                .then(contractAddress => ({contractAddress})),
            methods.contractCreation().call()
                .then(contractCreation => ({
                    contractCreation: toMilliseconds(contractCreation)
                })),
            methods.supplierAddress().call()
                .then(supplierAddress => ({supplierAddress})),
            methods.reputation().call()
                .then(reputation => ({reputation})),
            methods.amountToClaim().call()
                .then(amountToClaim => ({amountToClaim})),
            methods.amountClaimedSoFar().call()
                .then(amountClaimedSoFar => ({amountClaimedSoFar})),
            methods.trialPrice().call()
                .then(trialPrice => ({trialPrice})),
            methods.trialDurationInDays().call()
                .then(trialDurationInDays => ({trialDurationInDays})),
            methods.trialInfoShared().call()
                .then(trialInfoShared => ({trialInfoShared})),
            methods.trialActive().call()
                .then(trialActive => ({trialActive})),
            methods.trialStartTime().call()
                .then(trialStartTime => ({trialStartTime})),
            methods.trialFinishTime().call()
                .then(trialFinishTime => ({trialFinishTime})),
            methods.subscriptionName().call()
                .then(subscriptionName => ({subscriptionName})),
            methods.subscriptionLengthInWeeks().call()
                .then(subscriptionLengthInWeeks => ({subscriptionLengthInWeeks})),
            methods.totalSubscriptionPrice().call()
                .then(totalSubscriptionPrice => ({totalSubscriptionPrice})),
            methods.amountToDeposit().call()
                .then(amountToDeposit => ({amountToDeposit: amountToDeposit})),
            methods.joiningFee().call()
                .then(joiningFee => ({joiningFee})),
            methods.exitFee().call()
                .then(exitFee => ({exitFee})),
            methods.details().call()
                .then(smallDetails => ({smallDetails})),
            methods.subscriptionStartTime().call()
                .then(subscriptionStartTime => ({subscriptionStartTime})),
            methods.subscriptionFinishTime().call()
                .then(subscriptionFinishTime => ({subscriptionFinishTime})),
            methods.subscriptionActive().call()
                .then(subscriptionActive => ({subscriptionActive})),
            methods.subscriptionCancelled().call()
                .then(subscriptionCancelled => ({subscriptionCancelled})),
            //methods.subscriberAddress().call(), not a function
        ]);
    };
}

module.exports = SubscriptionContract;