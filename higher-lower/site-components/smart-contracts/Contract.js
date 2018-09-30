import Web3 from "./Web3";

class Contract {
    constructor(abi, contract){
        this.web3 = Web3.getInstance();
        this.contract = new this.web3.eth.Contract(abi, contract);
        this.methods = this.contract.methods;
    }

    toEth = (wei, decimals = 4) => {
        return parseFloat(parseFloat(this.web3.utils.fromWei(wei)).toFixed(decimals));
    };

    arrayToObject = (responses) => {
        if(responses.length > 0){
            return responses.reduce((accumulator, currentValue) =>
                Object.assign({}, accumulator, currentValue)
            );
        }

        return {};
    }
}

export default Contract;