# `password-validate`
A password manager library.

## Installation

```sh
npm i password-validate;
```

## Usage

```js
const passwordValidate = require('password-validate');
```

### Static Configuration
```js
passwordValidate.minimumLength = 5;
passwordValidate.hasLowerCase = true;
passwordValidate.hasUpperCase = true;
passwordValidate.hasSymbols = true;
passwordValidate.hasNumbers = true;

passwordValidate('myP@55w*rD').is.valid(); // true
passwordValidate('@4111').has.symbols(); // true
passwordValidate('@4111').has.numbers(); // true
passwordValidate('@4111').has.lowerCase(); // false
passwordValidate('@4111').has.upperCase(); // false
passwordValidate('abcd').has.numbers(); // false
passwordValidate('abcd').has.minimumLength(); // false
```

### Dynamic Configuration
```js
passwordValidate.minimumLength = 5;
passwordValidate.hasLowerCase = false;
passwordValidate.hasUpperCase = false;
passwordValidate.hasSymbols = false;
passwordValidate.hasNumbers = false;

passwordValidate('abcde')
  .is.valid(); // => true
passwordValidate('abcde', {
  hasLowerCase: true
}).is.valid(); // => true
passwordValidate('abcde', {
  hasUpperCase: true
}).is.valid(); // => false
```

## License

MIT (See [LICENSE](LICENSE))