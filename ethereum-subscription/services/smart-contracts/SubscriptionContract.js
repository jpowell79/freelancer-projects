const abi = require('./subscriptionContractAbi');
const {
    toMilliseconds,
    parseNumberStringsToNumbers,
    parseContractArrayToObject,
    weiToEth
} = require('./contractParser');

const callGetters = (methods) => {
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
            .then(trialPrice => ({trialPrice: weiToEth(trialPrice)})),
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
            .then(totalSubscriptionPrice => ({
                totalSubscriptionPrice: weiToEth(totalSubscriptionPrice)
            })),
        methods.subscriptionAmountToPay().call()
            .then(subscriptionAmountToPay => ({
                subscriptionAmountToPay: weiToEth(subscriptionAmountToPay)
            })),
        methods.joiningFee().call()
            .then(joiningFee => ({
                joiningFee: weiToEth(joiningFee)
            })),
        methods.exitFee().call()
            .then(exitFee => ({
                exitFee: weiToEth(exitFee)
            })),
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

function SubscriptionContract({web3, address}){
    const contract = new web3.eth.Contract(abi, address);
    const methods = contract.methods;

    this.fetchSubscriptionData = () => {
        return (
            callGetters(methods)
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
    this.setSubscriptionDetails = ({
        subscriptionName,
        supplierWalletAddress,
        subscriptionLengthInWeeks,
        subscriptionPrice,
        joinFee,
        exitFee,
        supplierEmail,
        subscriptionDetails,
        admin
    }) => {
        return methods._amendDetails(
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
    this.setSupplierWalletAddress = ({walletAddress, admin}) => {
        return methods._setSupplierWalletAddress(walletAddress)
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
     * @param details A string of other information about the subscription.
     * @returns {PromiEvent<any>}
     */
    this.setSubscriptionDetailsAsSupplier = ({
        subscriptionName,
        supplierWalletAddress,
        subscriptionLengthInWeeks,
        subscriptionPrice,
        joinFee,
        exitFee,
        supplierEmail,
        subscriptionDetails,
        supplier
    }) => {
        return methods._amendDetails(
            subscriptionName,
            supplierWalletAddress,
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
    this.setTrialSubscriptionDetails = ({
        supplierAddress,
        supplierEmail,
        username,
        password,
        other,
        trialDurationInDays
    }) => {
        return methods.setTrialSubscriptionDetails(
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
    this.startTheTrial = () => {
        return methods.startTheTrial().call();
    };

    /**
     * Can only be called after the trial is active.
     */
    this.claimTrialPayment = () => {
        return methods.claimTrialPayment().call();
    };

    this.setFullSubscriptionDetails = ({
        supplierEmail,
        username,
        password,
        other,
        supplierAddress
    }) => {
        return methods.setFullSubcriptionDetails(
            supplierEmail,
            username,
            password,
            other
        ).send({
            from: supplierAddress
        });
    };

    this.startTheSubscription = () => {
        return methods.startTheSubscription().call();
    };

    this.claimSubscriptionEth = ({supplierAddress}) => {
        return methods.claimSubscriptionEth.call({
            from: supplierAddress
        });
    };
    //endregion

    //region Subsciber only methods
    this.depositTrialFee = ({trialPrice, subscriberAddress}) => {
        return methods.depositTrialFee().send({
            from: subscriberAddress,
            value: web3.utils.toWei(trialPrice, 'ether')
        });
    };

    this.depositSubscription = ({subscriptionAmountToPay, subscriberAddress}) => {
        return methods.depositTrialFee().send({
            from: subscriberAddress,
            value: web3.utils.toWei(subscriptionAmountToPay, 'ether')
        });
    };

    //endregion

    this.cancelSubscription = ({subscriberOrSupplier}) => {
        return methods.cancelSubscription().send({
            from: subscriberOrSupplier
        });
    };
}

module.exports = SubscriptionContract;