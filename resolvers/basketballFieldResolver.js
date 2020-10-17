// • (5%) allBasketballFields - Should return a collection of all basketball fields. Contains a field argument called status which is of type BasketballFieldStatus (enum) and should be used to filter the data based on the status of the basketball field
// • (5%) basketballField - Should return a specific basketball field by id

const errors = require("../errors");
const fields = require("../services/basketballFieldService")

module.exports = {
    queries: {
        allBasketballFields: async (parent, args) => {
            return 0;
        },
        basketballFields: async (parent, args) => {
            return 0;
        }

    },
    types: {
        BasketballField: {
            pickupGames: async (parent, args, {db}) => (await db.PickupGame.find({})).filter(b => b.basketballFieldId === parent.id)
        }

    }
};