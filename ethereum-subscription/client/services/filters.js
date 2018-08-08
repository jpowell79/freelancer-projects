import objects from '../../services/objects';
import strings from '../../services/strings';

export const filterSubscriptionContracts = (subscriptionContracts, filterState) => {
    if(objects.isEmpty(filterState)) return subscriptionContracts;

    const {
        gymMembershipChecked,
        iptvSubscriptionChecked,
        otherChecked,
        magazineSubscriptionChecked,
        websiteMembershipChecked,
        showActiveSubscriptionsChecked,
        showZeroReputationChecked,
        showExitFeeChecked,
        showJoinFeeChecked,
        txHashSearch
    } = filterState;

    //TODO: Move to a more public location or generalize.
    const types = [
        "Gym Membership", "IPTV Subscription",
        "Magazine Subscription", "Website Membership"
    ];

    const filterContract = (contract) => {
        if(hasTypeToHide(contract))
            return false;
        if(hasActiveSubscriptionToHide(contract))
            return false;
        if(hasReputationToHide(contract))
            return false;
        if(hasExitFeeToHide(contract))
            return false;
        if(hasJoinFeeToHide(contract))
            return false;

        return !hasTxHashToHide(contract);
    };

    const hasExitFeeToHide = (contract) => {
        return (!showExitFeeChecked) ? contract.exitFee !== 0 : false;
    };

    const hasJoinFeeToHide = (contract) => {
        return (!showJoinFeeChecked) ? contract.joiningFee !== 0 : false;
    };

    const hasTxHashToHide = (contract) => {
        return (strings.isDefined(txHashSearch))
            ? !contract.txHash.startsWith(txHashSearch)
            : false;
    };

    const hasReputationToHide = (contract) => {
        return !showZeroReputationChecked ? contract.reputation === 0 : false;
    };

    const hasActiveSubscriptionToHide = (contract) => {
        return !showActiveSubscriptionsChecked ? contract.subscriptionActive : false;
    };

    const hasTypeToHide = (contract) => {
        if(isTypeToHide(contract, gymMembershipChecked, "Gym Membership"))
            return true;
        if(isTypeToHide(contract, iptvSubscriptionChecked, "IPTV Subscription"))
            return true;
        if(isTypeToHide(contract, magazineSubscriptionChecked, "Magazine Subscription"))
            return true;
        if(isTypeToHide(contract, websiteMembershipChecked, "Website Membership"))
            return true;

        return isTypesToHide(contract, otherChecked, types);
    };

    const isTypeToHide = (contract, showType, type) => {
        return (!showType) ? contract.type === type : false;
    };

    const isTypesToHide = (contract, showOtherTypes, types) => {
        return (!showOtherTypes) ? !types.includes(contract.type) : false;
    };

    return subscriptionContracts.filter(contract => filterContract(contract));

    /*
            index: i,
            type: subsriptionTypes[random(0, subsriptionTypes.length)],
            txHash: `0x${strings.generateRandom(40)}`,
            supplierName: `Supplier ${i}`,
            hasFreeTrials: (random(0, 2) === 1),
            admin: `0x${strings.generateRandom(40)}`,
            amountClaimedSoFar: random(0, 50),
            amountToClaim: random(0, 50),
            contractAddress: `0x${strings.generateRandom(40)}`,
            contractCreation: Date.now() - random(0, 1000 * 60 * 60 * 24 * 600),
            details: strings.generateRandom(100),
            exitFee: random(0, 50)/100,
            joiningFee: random(0, 50)/100,
            reputation: (random(0, 2) === 1) ? 0 : random(0, 551),
            subscriptionActive: (random(0, 50) === 10),
            subscriptionAmountToPay: random(0, 50)/100,
            subscriptionCancelled: random(0, 2) === 1,
            subscriptionFinishTime: random(0, 50),
            subscriptionLengthInWeeks: random(0, 50),
            subscriptionName: `Subscription ${i}`,
            subscriptionStartTime: Date.now() + random(0, 1000 * 60 * 60 * 24 * 100),
            supplierAddress: `0x${strings.generateRandom(40)}`,
            totalSubscriptionPrice: random(0, 50),
            trialActive: random(0, 2) === 1,
            trialDurationInDays: random(0, 50),
            trialFinishTime: random(0, 50),
            trialInfoShared: random(0, 2) === 1,
            trialPrice: random(0, 50)/100,
            trialStartTime: random(0, 50),
     */
};