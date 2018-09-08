const expect = require('chai').expect;
const strings = require('../../services/datatypes/strings');

describe('strings', () => {
    describe('isDefined', () => {
        it('Should determine that array of strings are defined', () => {
            expect(strings.isDefined(['hello', 'hello'])).to.be.equal(true);
        });

        it('Should determine that a string in array is undefined', () => {
            expect(strings.isDefined(['hello', '', 'hello'])).to.be.equal(false);
        });

        it('Should determine that a single string is defined', () => {
            expect(strings.isDefined('hello')).to.be.equal(true);
        });

        it('Should determine that a single string is undefined', () => {
            expect(strings.isDefined('')).to.be.equal(false);
        });
    });

    describe('hasXCharacters', () => {
        it('Should find that string has special characters', () => {
            expect(strings.hasSpecialCharacters('F0o_')).to.be.equal(true);
        });

        it('Should find that string has no special characters', () => {
            expect(strings.hasSpecialCharacters('F0o')).to.be.equal(false);
        });

        it('Should find that string has uppercase characters', () => {
            expect(strings.hasUpperCase('F0o_')).to.be.equal(true);
        });

        it('Should find that string has no uppercase characters', () => {
            expect(strings.hasUpperCase('f0o_')).to.be.equal(false);
        });

        it('Should find that string has lowercase characters', () => {
            expect(strings.hasLowerCase('F0o_')).to.be.equal(true);
        });

        it('Should find that string has no lowercase characters', () => {
            expect(strings.hasLowerCase('F0O_')).to.be.equal(false);
        });
    });

    describe('spaceCamelCase', () => {
        it('Should add a space before each uppercase and turn first letter uppercase.', () => {
            expect(strings.spaceCamelCase('camelCaseString')).to.be.equal('Camel Case String');
        });
    });

    describe('toCamelCase', () => {
        it('Should return empty string when empty string is sent', () => {
            expect(strings.toCamelCase('')).to.be.equal('');
        });

        it('Should decapitalize when 1 letter is sent', () => {
            expect(strings.toCamelCase('A')).to.be.equal('a');
        });

        it('Should turn into camelCase', () => {
            expect(strings.toCamelCase('Foo Bar Bar')).to.be.equal('fooBarBar');
        });
    });

    describe('generateRandom', () => {
        it('Generates string of given length', () => {
            expect(strings.generateRandom(100).length).to.be.equal(100);
        });
    });
});