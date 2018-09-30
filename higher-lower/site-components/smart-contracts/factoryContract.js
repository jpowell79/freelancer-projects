import Contract from "./Contract";
import {masterContract} from "../../settings";
import {factoryAbi} from "./factoryAbi";

class FactoryContract extends Contract {
    constructor(){
        super(factoryAbi, masterContract);
    }

    callGetters = async () => {
        return Promise.all([
            this.getAddress(),
            this.getBalance(),
            this.getCount(),
            this.getLatestSpawnedContract(),
            this.getAdmin()
        ]).then(this.arrayToObject);
    };

    getLatestSpawnedContract = async () => {
        return this.methods.latestSpawnedContract().call()
            .then(latestSpawnedContract => ({latestSpawnedContract}));
    };

    getPreviousContract = async () => {
        return this.methods.previousContract().call();
    };

    getCount = async () => {
        return this.methods.getContractCount().call()
            .then(count => ({count: parseInt(count, 10)}));
    };
}

export default new FactoryContract();