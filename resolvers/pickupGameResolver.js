const db = require('../data/db');

module.exports = {
    queries: {
        allPickupGames: async () => {
            try {
                const allPickupGames = pickupGame.find();
                return allPickupGames;
            } catch (e) {
                console.log("e", e);
                return [];
            }
        },
        pickupGame: (parent, args) => {
            return db.pickupGame.find(e => e.id === args.id);
        }
    },
    mutations: {
        createPickupGame: (parent, args) => {
            return 0;
        },
        addPlayerToPickupGame: (parent, args) => {
            return 0;
        },
        removePlayerPickupGame: (parent, args) => {
            return 0;
        },

        deletePickupGame: (parent, args) => {
            db.pickupGames = db.pickupGames.filter(c => c.id !== args.id);
            return true;
        }
    }
};