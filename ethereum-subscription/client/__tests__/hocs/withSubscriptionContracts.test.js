import React from 'react';
import {shallow} from 'enzyme';
import withSubscriptionContract from '../../hocs/withSubscriptionContracts';

const mockComponent = () => <div/>;

describe('withSubscriptionContracts', () => {
    const options = {useDummyData: true};
    const SubscriptionContract = withSubscriptionContract(options)(mockComponent);
    const wrapper = shallow(<SubscriptionContract/>);

    it('Should add props', () => {
        expect(wrapper.props().isLoadingSubscriptionContracts).toBeDefined();
        expect(wrapper.props().liveSubscriptionContracts).toBeDefined();
        expect(wrapper.props().loadContracts).toBeDefined();
    });

    it('Should load one contract with same start and end', () => {
        wrapper.props().loadContracts(0, 0);
        expect(wrapper.props().liveSubscriptionContracts.length).toBe(1);
    });

    it('Should load contracts up to end value', () => {
        wrapper.props().loadContracts(1, 100);
        expect(wrapper.props().liveSubscriptionContracts.length).toBe(100);
    });

    it('Should load correct indexes', () => {
        wrapper.props().loadContracts(1, 100);
        expect(wrapper.props().liveSubscriptionContracts[0].index).toBe(1);
        expect(wrapper.props().liveSubscriptionContracts[99].index).toBe(100);
    });
});