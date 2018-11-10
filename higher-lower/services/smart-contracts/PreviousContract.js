import TemplateContract from "./TemplateContract";

class PreviousContract extends TemplateContract {
    static hasContractAddress = [];
    static instance = null;

    static getInstance = (address) => {
        if(PreviousContract.hasContractAddress[address]){
            return PreviousContract.instance;
        }

        PreviousContract.instance = new PreviousContract(address);
        PreviousContract.hasContractAddress[address] = true;

        return PreviousContract.instance;
    };

    constructor(address){
        super(address);
    }

    fetch = async () => {
        return Promise.all([
            this.getAddress(),
            this.getWinningNumber(),
            this.getGameEndTime(),
            this.getLastGuessAddress()
        ]).then(this.arrayToObject);
    };
}

export default PreviousContract;