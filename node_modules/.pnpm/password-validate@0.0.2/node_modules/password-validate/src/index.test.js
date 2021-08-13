const {expect} = require('chai');
const passwordValidate = require('./index');

describe('password-validate', () => {
  describe('configuration', () => {
    before(() => {
      passwordValidate.minimumLength = 3;
      passwordValidate.hasLowerCase = false;
      passwordValidate.hasUpperCase = false;
      passwordValidate.hasSymbols = false;
      passwordValidate.hasNumbers = false;
    });

    it('can be done through static properties', () => {
      expect(passwordValidate('aaa').is.valid()).to.eql(true);
      passwordValidate.hasNumbers = true;
      expect(passwordValidate('aaa').is.valid()).to.eql(false);
      expect(passwordValidate('aaa1').is.valid()).to.eql(true);
      passwordValidate.hasSymbols = true;
      expect(passwordValidate('aaa1').is.valid()).to.eql(false);
      expect(passwordValidate('aaa1#').is.valid()).to.eql(true);
      passwordValidate.hasUpperCase = true;
      expect(passwordValidate('aaa1#').is.valid()).to.eql(false);
      expect(passwordValidate('aaA1#').is.valid()).to.eql(true);
      passwordValidate.hasLowerCase = true;
      expect(passwordValidate('aaA1#').is.valid()).to.eql(true);
      expect(passwordValidate('AAA1#').is.valid()).to.eql(false);
      passwordValidate.minimumLength = 6;
      expect(passwordValidate('AAA1#').is.valid()).to.eql(false);
      expect(passwordValidate('AAA1#a').is.valid()).to.eql(true);
      expect(passwordValidate('AAA1#aa').is.valid()).to.eql(true);
    });

    it('can be done through the :options argument', () => {
      expect(passwordValidate('aaaa', {
        minimumLength: 4,
        hasLowerCase: true,
        hasUpperCase: false,
        hasSymbols: false,
        hasNumbers: false,
      }).is.valid()).to.eql(true);
      expect(passwordValidate('AAAA', {
        minimumLength: 4,
        hasLowerCase: true,
        hasUpperCase: true,
        hasSymbols: false,
        hasNumbers: false,
      }).is.valid()).to.eql(false);
      expect(passwordValidate('AAAa', {
        minimumLength: 4,
        hasLowerCase: true,
        hasUpperCase: true,
        hasSymbols: false,
        hasNumbers: false,
      }).is.valid()).to.eql(true);
    });

    it('defaults to the static properties when the properties in :options are not specified', () => {
      passwordValidate.minimumLength = 3;
      passwordValidate.hasLowerCase = false;
      passwordValidate.hasUpperCase = false;
      passwordValidate.hasSymbols = false;
      passwordValidate.hasNumbers = false;
      expect(passwordValidate('AAA', {
        hasLowerCase: true,
      }).is.valid()).to.eql(false);
      expect(passwordValidate('AAA').is.valid()).to.eql(true);
    });
  });

  describe('parameter verfication', () => {
    before(() => {
      passwordValidate.minimumLength = 3;
      passwordValidate.hasLowerCase = true;
      passwordValidate.hasUpperCase = true;
      passwordValidate.hasSymbols = true;
      passwordValidate.hasNumbers = true;
    });

    it('can be called on the length', () => {
      expect(passwordValidate('aaaa').has.minimumLength()).to.eql(true);
      expect(passwordValidate('aaa').has.minimumLength()).to.eql(true);
      expect(passwordValidate('aa').has.minimumLength()).to.eql(false);
    });

    it('can be called to check presence of symbols', () => {
      expect(passwordValidate('aaa').has.symbols()).to.eql(false);
      expect(passwordValidate('#').has.symbols()).to.eql(true);
    });

    it('can be called to check presence of numbers', () => {
      expect(passwordValidate('aaa').has.numbers()).to.eql(false);
      expect(passwordValidate('1').has.numbers()).to.eql(true);
    });

    it('can be called to check presence of lower case characters', () => {
      expect(passwordValidate('aaa').has.lowerCase()).to.eql(true);
      expect(passwordValidate('a').has.lowerCase()).to.eql(true);
      expect(passwordValidate('A').has.lowerCase()).to.eql(false);
      expect(passwordValidate('Aa').has.lowerCase()).to.eql(true);
    });
    
    it('can be called to check presence of upper case characters', () => {
      expect(passwordValidate('aaa').has.upperCase()).to.eql(false);
      expect(passwordValidate('a').has.upperCase()).to.eql(false);
      expect(passwordValidate('A').has.upperCase()).to.eql(true);
      expect(passwordValidate('Aa').has.upperCase()).to.eql(true);
    });
  });
});
