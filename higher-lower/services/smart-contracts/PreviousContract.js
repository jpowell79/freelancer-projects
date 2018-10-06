import TemplateContract from "./TemplateContract";

class PreviousContract extends TemplateContract {
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