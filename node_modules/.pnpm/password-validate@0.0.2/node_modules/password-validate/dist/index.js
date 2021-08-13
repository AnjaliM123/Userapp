"use strict";

var DEFAULT_PASSWORD_MINIMUM_LENGTH = 8;
var DEFAULT_PASSWORD_HAS_NUMBERS = true;
var DEFAULT_PASSWORD_HAS_SYMBOLS = true;
var DEFAULT_PASSWORD_HAS_UPPER_CASE = true;
var DEFAULT_PASSWORD_HAS_LOWER_CASE = true;

module.exports = passwordValidate;

/**
 * Validates the password :password. Returns an object with various properties
 * to check the integrity of the provided :password.
 *
 * @param {String} password
 * @param {Object} options
 * @param {Number} options.minimumLength
 * @param {Boolean} options.hasSymbols
 * @param {Boolean} options.hasNumbers
 * @param {Boolean} options.hasLowerCase
 * @param {Boolean} options.hasUpperCase
 * 
 * @return 
 */
function passwordValidate(password) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$minimumLength = _ref.minimumLength,
      minimumLength = _ref$minimumLength === undefined ? passwordValidate.minimumLength : _ref$minimumLength,
      _ref$hasSymbols = _ref.hasSymbols,
      hasSymbols = _ref$hasSymbols === undefined ? passwordValidate.hasSymbols : _ref$hasSymbols,
      _ref$hasNumbers = _ref.hasNumbers,
      hasNumbers = _ref$hasNumbers === undefined ? passwordValidate.hasNumbers : _ref$hasNumbers,
      _ref$hasLowerCase = _ref.hasLowerCase,
      hasLowerCase = _ref$hasLowerCase === undefined ? passwordValidate.hasLowerCase : _ref$hasLowerCase,
      _ref$hasUpperCase = _ref.hasUpperCase,
      hasUpperCase = _ref$hasUpperCase === undefined ? passwordValidate.hasUpperCase : _ref$hasUpperCase;

  var results = { _: {} };
  results._.minimumLength = password.length >= minimumLength;
  results._.symbols = hasSymbols ? password.match(/[\`\~\!\@\#\$\%\^&\*\(\)\-\_\=\+\[\]\{\}\\\|\:\;\"\'\<\>\,\.\?\/]/) !== null : true;
  results._.numbers = hasNumbers ? password.match(/[0-9]/) !== null : true;
  results._.upperCase = hasUpperCase ? password.match(/[A-Z]/) !== null : true;
  results._.lowerCase = hasLowerCase ? password.match(/[a-z]/) !== null : true;
  results.is = results;
  results.has = results;
  results.minimumLength = function () {
    return results._.minimumLength;
  };
  results.symbols = function () {
    return results._.symbols;
  };
  results.numbers = function () {
    return results._.numbers;
  };
  results.upperCase = function () {
    return results._.upperCase;
  };
  results.lowerCase = function () {
    return results._.lowerCase;
  };
  results.valid = function () {
    return Object.keys(results._).reduce(function (e, c) {
      return e && results._[c];
    }, true);
  };
  return results;
};

passwordValidate.minimumLength = DEFAULT_PASSWORD_MINIMUM_LENGTH;
passwordValidate.hasSymbols = DEFAULT_PASSWORD_HAS_SYMBOLS;
passwordValidate.hasNumbers = DEFAULT_PASSWORD_HAS_NUMBERS;
passwordValidate.hasLowerCase = DEFAULT_PASSWORD_HAS_LOWER_CASE;
passwordValidate.hasUpperCase = DEFAULT_PASSWORD_HAS_UPPER_CASE;