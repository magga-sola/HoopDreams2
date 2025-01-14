const queries = require('./queries');
const input = require('./input');
const mutations = require('./mutations');
const scalar = require('./scalar');
const enums = require('./enums');
const types = require('./types');
const { gql } = require('apollo-server');

module.exports = gql`
    ${queries}
    ${input}
    ${mutations}
    ${scalar}
    ${enums}
    ${types}
`;
