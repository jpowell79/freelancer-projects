import strings from "../../services/strings";
import {FILTERABLE_SUBSCRIPTION_TYPES} from "../clientSettings";
import {random} from "../../services/utils";
import {updateLiveSubscriptionContracts} from "../redux/actions";

class DummyContractLoader {
    constructor({dispatch, amountToGenerate}){
        this.dispatch = dispatch;
        this.amountToGenerate = amountToGenerate;
    }

    dispatchUpdateContracts = (contracts) => {
        this.dispatch(updateLiveSubscriptionContracts(contracts));
        return contracts;
    };

    loadAllContracts = async () => {
        return Promise.resolve(this.generateDummySubscriptionContracts(this.amountToGenerate))
            .then(this.dispatchUpdateContracts);
    };

    loadContracts = async (comparator) => {
        return Promise.resolve(
            this.getDummyData().filter(comparator)
        ).then(this.dispatchUpdateContracts);
    };

    generateDummySubscriptionContracts = (amount) => {
        const subscriptionContracts = [];
        const subsriptionTypes = [
            ...FILTERABLE_SUBSCRIPTION_TYPES,
            'Other',
            'Foobar'
        ];
        const users = [
            'admin',
            'smnrkssn',
            'supplier'
        ];

        for(let i = 0; i < amount; i++){
            const address = `0x${strings.generateRandom(40)}`;
            const username = (random(0, 5) === 2) ? users[random(0, users.length)] : `Supplier ${i}`;

            subscriptionContracts.push({
                index: i,
                isActive: true,
                type: subsriptionTypes[random(0, subsriptionTypes.length)],
                txHash: `0x${strings.generateRandom(40)}`,
                supplierName: username,
                ownerUsername: username,
                hasFreeTrials: (random(0, 2) === 1),
                admin: `0x${strings.generateRandom(40)}`,
                amountClaimedSoFar: random(0, 50),
                amountToClaim: random(0, 50),
                contractAddress: address,
                address: address,
                contractCreation: Date.now() - random(0, 1000 * 60 * 60 * 24 * 600),
                walletAge: strings.toDateString(new Date(
                    Date.now() - random(0, 1000 * 60 * 60 * 24 * 900))
                ),
                details: strings.generateRandom(100),
                exitFee: random(0, 50)/100,
                joiningFee: random(0, 50)/100,
                reputation: users.includes(username) ? 0 : (random(0, 4) === 2) ? 0 : random(0, 551),
                subscriptionActive: (random(0, 50) === 10),
                amountToDeposit: random(0, 50)/100,
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
            });
        }

        return subscriptionContracts;
    };
}

export default DummyContractLoader;