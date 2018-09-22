const defaultData = require("./defaultData");
const strings = require("../../../services/datatypes/strings");
const {random} = require("../../../services/utils");

const generateSubscribers = (amount) => {
    const subscribers = [];

    for(let i = 0; i < amount; i++){
        subscribers.push({walletAddress: `0x${strings.generateRandom(40)}`});
    }

    return subscribers;
};

const generateSubscriptionContracts = (amount) => {
    const subscriptionContracts = [];
    const addresses = [];

    const generateAddress = () => {
        const address = `0x${strings.generateRandom(40)}`;

        if(addresses.includes(address)){
            generateAddress(amount);
        } else {
            addresses.push(address);
            return address;
        }
    };

    for(let i = 0; i < amount; i++){
        subscriptionContracts.push({
            address: generateAddress(),
            ownerUsername: defaultData.users[random(0, defaultData.users.length)].username,
            typeName: module.exports.subscriptionTypes[
                random(0, module.exports.subscriptionTypes.length)
            ].name,
            details: strings.generateRandom(100)
        });
    }

    return subscriptionContracts;
};

const generateSubscriptionTypes = (amount) => {
    const subscriptionTypes = [];

    for(let i = 1; i <= amount; i++){
        subscriptionTypes.push({name: `Type ${i}`});
    }

    return subscriptionTypes;
};

module.exports.settings = defaultData.settings;
module.exports.subscriptionTypes = generateSubscriptionTypes(30);
module.exports.users = defaultData.users;
module.exports.subscriptionContracts = generateSubscriptionContracts(250);
module.exports.subscribers = generateSubscribers(100);
module.exports.subscriptions = [];