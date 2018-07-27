import * as reducers from '../../redux/reducers';
import {settings} from "../../redux/reducers";
import {loadSettings} from "../../redux/actions";

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