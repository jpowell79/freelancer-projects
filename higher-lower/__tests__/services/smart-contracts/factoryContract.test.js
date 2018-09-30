import factoryContract from "../../../site-components/smart-contracts/factoryContract";

describe("FactoryContract", () => {
    it("Should get and convert values to correct datatype", () => {
        return factoryContract.callGetters()
            .then(contract => {
                console.log(contract);
                expect(typeof contract.address === "string").toBeTruthy();
                expect(typeof contract.balance === "number").toBeTruthy();
                expect(typeof contract.count === "number").toBeTruthy();
                expect(typeof contract.latestSpawnedContract === "string").toBeTruthy();
                expect(typeof contract.admin === "string").toBeTruthy();
            });
    });
});