
const errors = require("../errors");
const db = require('../data/db').connection;
const dbPickupGames = require('../data/db').PickupGame;
const dbBasketballFields = require('../data/db').BasketballField;
const fields = require("../services/basketballFieldService");

module.exports = {
    queries: {
        allBasketballFields: async (parent, args) => {
            const basketballFields = await herokuFields.basketballFields.response.body.filter(b => b.status == args.status);
            if (basketballFields != null) {
            return basketballFields
            } else {
                return errors.NotFoundError();
            }
        },

        basketballField: async (parent, args) => {
            const basketballField = await herokuFields.findById(args.id);
            if (basketballField != null) {
            return basketballField;
            } else {
                throw new errors.NotFoundError();
                }
            }

        },
    types: {
        BasketballField: {
            pickupGames: async (parent, args) => {
                const games = [];

                parent.pickupGames.forEach( gameId => {
                    let game = dbPickupGames.findById(gameId);
                    games.push(game);
                })
                return games;
            }
        }
    }
};