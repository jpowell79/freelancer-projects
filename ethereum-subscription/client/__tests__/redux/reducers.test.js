import * as reducers from '../../redux/reducers';
import {settings, metamaskAccount} from "../../redux/reducers";
import {loadSettings, isLoadingAccount, updateMetamaskAccount} from "../../redux/actions";

it('All reducers returns state by default', () => {
    Object.keys(reducers).forEach(reducerKey => {
        if(reducerKey !== "default" && typeof reducers[reducerKey] === "function"){
            expect(reducers[reducerKey]('__foo__', '__bar__')).toBe('__foo__');
        }
    });
});

describe('settings', () => {
    it('Should load settings', () => {
        expect(settings([], loadSettings('Foo'))).toBe('Foo');
    });
});

describe('metamaskAccount', () => {
    it('Should update metamaskAccount', () => {
        expect(metamaskAccount({}, updateMetamaskAccount('foo'))).toBe('foo');
    });

    it('Should set metamaskAccount to isLoading', () => {
        expect(metamaskAccount({}, isLoadingAccount())).toEqual({isLoading: true});
    });
});