import TemplateContract from "../../../services/smart-contracts/TemplateContract";

describe("TemplateContract", () => {
    const templateContract = new TemplateContract("0x6dbaEa5167cF533392DC7fa145c409b79fCCb88b");

    it("Should get and convert values to correct datatype", () => {
        return templateContract.fetch()
            .then(contract => {
                console.log(contract);
                expect(typeof contract.address === "string").toBeTruthy();
                expect(typeof contract.admin === "string").toBeTruthy();
                expect(typeof contract.balance === "number").toBeTruthy();
                expect(typeof contract.highValue === "number").toBeTruthy();
                expect(typeof contract.lowValue === "number").toBeTruthy();
                expect(typeof contract.costOfNextGuess === "number").toBeTruthy();
                expect(typeof contract.nextGuess === "number").toBeTruthy();
                expect(typeof contract.lastGuessAddress === "string").toBeTruthy();
                expect(typeof contract.gameEndTime === "number").toBeTruthy();
                expect(typeof contract.winningNumber === "number").toBeTruthy();
            });
    });
});