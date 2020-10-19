const errors = require("../errors");
const dbPickupGames = require('../data/db').PickupGame;
const fields = require("../services/basketballFieldService");

module.exports = {
    queries: {
        allBasketballFields: async (parent, args) => {
            const basketballFields = await fields.BasketballFields.response.body;

            if (basketballFields != null) {
            return basketballFields
            } else {
                return errors.NotFoundError();
            }
        },

        basketballField: async (parent, args) => {
            const basketballField = await fields.findById(args.id);
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
                let games = dbPickupGames.find({location: parent.id});
                return games;
            }
        }
    }
};