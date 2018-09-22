import React from "react";
import {shallow} from "enzyme";
import withSubscriptionContract from "../../hocs/withSubscriptionContracts";

const mockComponent = () => <div/>;

describe("withSubscriptionContracts", () => {
    const options = {
        useDummyData: true,
        amountOfDummyDataToGenerate: 513
    };
    const SubscriptionContract = withSubscriptionContract(options)(mockComponent);
    const wrapper = shallow(<SubscriptionContract/>);

    it("Should add props", () => {
        expect(wrapper.props().contracts).toBeDefined();
        expect(wrapper.props().fetchContracts).toBeDefined();
    });

    it("Should load one contract with same start and end", (done) => {
        wrapper
            .props()
            .fetchContracts(0, 0)
            .then(contracts => {
                expect(contracts.length).toBe(1);
                done();
            });
    });

    it("Should load contracts up to end value", (done) => {
        wrapper
            .props()
            .fetchContracts(1, 100)
            .then(contracts => {
                expect(contracts.length).toBe(100);
                done();
            });
    });

    it("Should load all contracts", (done) => {
        wrapper
            .props()
            .loadAllContracts({amountToLoadPerBatch: 50})
            .then(() => {
                expect(wrapper.props().contracts.length).toBe(
                    options.amountOfDummyDataToGenerate
                );
                done();
            });
    });
});