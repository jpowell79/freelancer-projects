import Strings from '../../../services/Strings/index';

it('Should turn false boolean into false string', () => {
    expect(Strings.booleanToString(false)).toBe('false');
});

it('Should turn true boolean into true string', () => {
    expect(Strings.booleanToString(true)).toBe('true');
});

it('Should ignore values not in array', () => {
    expect(Strings.includesIgnoreCase(['foo', 'foo2'], 'bar')).toBe(false);
});

it('Should treat string with different case sensitivity as included', () => {
    expect(Strings.includesIgnoreCase(['foo', 'bar'], 'Bar')).toBe(true);
});