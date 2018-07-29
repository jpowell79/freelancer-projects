const expect = require('chai').expect;
const strings = require('../../services/strings');

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

});