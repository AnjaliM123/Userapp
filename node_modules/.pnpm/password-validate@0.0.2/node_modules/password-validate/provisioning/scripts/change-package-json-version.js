const fs = require('fs');
const packageJson = require('../../package.json');
const {version} = packageJson;

packageJson.version = process.argv[2];

console.info(JSON.stringify(packageJson, null, 2));
