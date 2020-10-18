// • (5%) allBasketballFields - Should return a collection of all basketball fields. Contains a field argument called status which is of type BasketballFieldStatus (enum) and should be used to filter the data based on the status of the basketball field
// • (5%) basketballField - Should return a specific basketball field by id

const errors = require("../errors");
const db = require('../data/db').connection;
const dbPickupGames = require('../data/db').PickupGame;
const dbBasketballFields = require('../data/db').BasketballField;
module.exports = {
    queries: {
        allBasketballFields: async (parent, args) => {
            const basketballFields = await dbBasketballFields.find({});

            if (basketballFields != null) {
            return basketballFields
            } else {
                return errors.NotFoundError();
            }
        },

        basketballField: async (parent, args) => {
            const basketballField = await dbBasketballFields.findById(args.id);

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