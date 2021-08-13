const DEFAULT_PASSWORD_MINIMUM_LENGTH = 8;
const DEFAULT_PASSWORD_HAS_NUMBERS = true;
const DEFAULT_PASSWORD_HAS_SYMBOLS = true;
const DEFAULT_PASSWORD_HAS_UPPER_CASE = true;
const DEFAULT_PASSWORD_HAS_LOWER_CASE = true;

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
function passwordValidate(password, {
  minimumLength = passwordValidate.minimumLength,
  hasSymbols = passwordValidate.hasSymbols,
  hasNumbers = passwordValidate.hasNumbers,
  hasLowerCase = passwordValidate.hasLowerCase,
  hasUpperCase = passwordValidate.hasUpperCase,
} = {}) {
  const results = {_: {}};
  results._.minimumLength = (password.length >= minimumLength);
  results._.symbols = hasSymbols ? (password.match(/[\`\~\!\@\#\$\%\^&\*\(\)\-\_\=\+\[\]\{\}\\\|\:\;\"\'\<\>\,\.\?\/]/) !== null) : true;
  results._.numbers = hasNumbers ? (password.match(/[0-9]/) !== null) : true;
  results._.upperCase = hasUpperCase ? (password.match(/[A-Z]/) !== null) : true;
  results._.lowerCase = hasLowerCase ? (password.match(/[a-z]/) !== null) : true;
  results.is = results;
  results.has = results;
  results.minimumLength = () => results._.minimumLength;
  results.symbols = () => results._.symbols;
  results.numbers = () => results._.numbers;
  results.upperCase = () => results._.upperCase;
  results.lowerCase = () => results._.lowerCase;
  results.valid = () => Object.keys(results._).reduce((e, c) => {
    return e && results._[c];
  }, true);
  return results;
};

passwordValidate.minimumLength = DEFAULT_PASSWORD_MINIMUM_LENGTH;
passwordValidate.hasSymbols = DEFAULT_PASSWORD_HAS_SYMBOLS;
passwordValidate.hasNumbers = DEFAULT_PASSWORD_HAS_NUMBERS;
passwordValidate.hasLowerCase = DEFAULT_PASSWORD_HAS_LOWER_CASE;
passwordValidate.hasUpperCase = DEFAULT_PASSWORD_HAS_UPPER_CASE;
