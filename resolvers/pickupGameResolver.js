const db = require('../data/db');
const PickupGame = require('../mongoose/models/PickupGame');

module.exports = {
    queries: {
        allPickupGames: async () => {
            try {
                const allPickupGames = pickupGame.find({});
                return allPickupGames;
            } catch (e) {
                console.log("e", e);
                return [];
            }
        },
        pickupGame: async (obj, {id}) => {
            console.log(id);
            try {
                const foundPickupGame = await PickupGame.findbyId(id);
                return foundPickupGame;
            } catch(e) {
                console.log("e", e);
                return {}
            }
        }
//        pickupGame: (parent, args) => {
//            return db.pickupGame.find(e => e.id === args.id);
//        }
    },
    mutations: {
        createPickupGame: (parent, args) => {
            return 0;
        },
        addPlayerToPickupGame: (parent, args) => {
            return 0;
        },
        removePlayerFromPickupGame: (parent, args) => {
            return 0;
        },

        removePickupGame: (parent, args) => {
            db.pickupGames = db.pickupGames.filter(c => c.id !== args.id);
            return true;
        }
    }
};