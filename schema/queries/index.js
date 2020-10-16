const PlayerQuery = require('./PlayerQueries');
const PickupQuery = require('./PickupGameQueries');
const BasketballFieldQuery = require('./basketballFieldQueries');

module.exports = `
    type Query {
    ${PlayerQuery}
    ${PickupQuery}
    ${BasketballFieldQuery}
    }
    `;