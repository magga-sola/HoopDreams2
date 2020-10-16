const queries = require('./queries');
const input = require('./input');
const mutations = require('./mutations');
//const scalar = require('./scalar');
const enums = require('./enums');
const types = require('./types');

module.exports = `
    ${queries}
    ${input}
    ${mutations}
    ${enums}
    ${types}

`;