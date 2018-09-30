import factoryContract from "../../../site-components/smart-contracts/factoryContract";

describe("FactoryContract", () => {
    it("Gets stuff", () => {
        return factoryContract.callGetters().then(res => console.log(res));
    });
});