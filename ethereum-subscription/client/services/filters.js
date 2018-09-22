import objects from "../../services/datatypes/objects";
import strings from "../../services/datatypes/strings";
import {FILTERABLE_SUBSCRIPTION_TYPES} from "../clientSettings";

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

    const types = FILTERABLE_SUBSCRIPTION_TYPES;

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
            ? !contract.transactionHash.startsWith(txHashSearch)
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
};