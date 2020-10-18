// • (5%) allBasketballFields - Should return a collection of all basketball fields. Contains a field argument called status which is of type BasketballFieldStatus (enum) and should be used to filter the data based on the status of the basketball field
// • (5%) basketballField - Should return a specific basketball field by id

const errors = require("../errors");
const basketballFields = require('../data/db').BasketballField;
module.exports = {
    queries: {
        allBasketballFields: async (parent, args) => {
            const basketballfields = await basketballFields.find({});
            return basketballfields
        },

        basketballField: async (parent, args) => {
            const basketballField = await basketballFields.findById(args.id);
            if (basketballField != null) {
            return basketballField;
            } else {
                throw new errors.NotFoundError();
                }
            }

        },
    types: {


    }
};