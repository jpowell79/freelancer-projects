import Contract from "./Contract";
import {templateAbi} from "./templateAbi";

class TemplateContract extends Contract {
    constructor(address){
        super(templateAbi, address);
    }

    fetch = async () => {
        return Promise.all([
            this.getAdmin(),
            this.getAddress(),
            this.getBalance(),
            this.getLowValue(),
            this.getHighValue(),
            this.getCostOfNextGuess(),
            this.getNextGuess(),
            this.getLastGuessAddress(),
            this.getGameEndTime()
        ]).then(this.arrayToObject);
    };

    makeGuess = async ({guessedNumber, walletAddress}) => {
        return this.methods.costOfNextGuess().call()
            .then(costOfNextGuess => this.methods.guessNumber(guessedNumber).send({
                from: walletAddress,
                value: costOfNextGuess
            }));
    };

    getWinningNumber = async () => {
        return this.methods.randomPublic().call()
            .then(winningNumber => ({winningNumber: parseInt(winningNumber, 10)}));
    };

    getGameEndTime = async () => {
        return this.methods.gameEnd().call()
            .then(gameEndTime => ({gameEndTime: this.toMilliseconds(gameEndTime)}))
    };

    getLastGuessAddress = async () => {
        return this.methods.lastGuessAddress().call()
            .then(lastGuessAddress => ({lastGuessAddress}));
    };

    getLowValue = async () => {
        return this.methods.lowValue().call()
            .then(lowValue => ({lowValue: parseInt(lowValue, 10)}));
    };

    getHighValue = async () => {
        return this.methods.highValue().call()
            .then(highValue => ({highValue: parseInt(highValue, 10)}));
    };

    getNextGuess = async () => {
        return this.methods.nextGuess().call()
            .then(nextGuess => ({nextGuess: parseInt(nextGuess, 10)}));
    };

    getCostOfNextGuess = async () => {
        return this.methods.costOfNextGuess().call()
            .then(costOfNextGuess => ({costOfNextGuess: this.toEth(costOfNextGuess)}));
    };
}

export default TemplateContract;