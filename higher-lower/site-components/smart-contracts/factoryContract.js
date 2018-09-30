import Contract from "./Contract";
import {masterContract} from "../../settings";
import {factoryAbi} from "./factoryAbi";
import {parseContractArrayToObject} from "./contractParser";

class FactoryContract extends Contract {
    constructor(){
        super(factoryAbi, masterContract);
    }

    callGetters = async () => {
        return Promise.all([
            this.getAddress().then(address => ({address})),
            this.getBalance().then(balance => ({balance: this.toEth(balance)})),
            this.getCount().then(count => ({count: parseInt(count, 10)})),
            this.getLatestSpawnedContract().then(latestSpawnedContract => ({
                latestSpawnedContract
            })),
            this.getAdmin().then(admin => ({admin}))
        ]).then(parseContractArrayToObject);
    };

    getAdmin = async () => {
        return this.methods.admin().call();
    };

    getLatestSpawnedContract = async () => {
        return this.methods.latestSpawnedContract().call();
    };

    getPreviousContract = async () => {
        return this.methods.previousContract().call();
    };

    getAddress = async () => {
        return this.methods.thisContractAddress().call();
    };

    getBalance = async () => {
        return this.methods.thisContractBalance().call();
    };

    getCount = async () => {
        return this.methods.getContractCount().call();
    };
}

export default new FactoryContract();