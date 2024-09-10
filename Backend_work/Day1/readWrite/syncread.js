// synchronus method
const { readFileSync } = require('fs');

const data = readFileSync('./user.json');
console.log(JSON.parse(data));
