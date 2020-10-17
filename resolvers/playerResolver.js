// • (5%) allPlayers - Should return a collection of all players
// • (5%) player - Should return a specific player by id
// • (5%) createPlayer - Create a player and returns the newly created player matching the Player type
// • (5%) updatePlayer - Updates a player by id and returns the updated player matching the Player type
// • (5%) removePlayer - Marks a player as deleted and returns either true or an error if something happened
const errors = require("../errors");
const db = require('../data/db').db;

module.exports = {
    queries: {

        //allPlayers
        allPlayers: async(parent, args) => {
            return (await db.Player.find({}));
        },
        //player
        player: async(parent, args) => {
            const player = await db.Player.findById(args.id);

            if (player != null) {
                return player;
            } else {
                throw new errors.NotFoundError();
            }
        }

    },
    mutations: {
        //createPlayer
        createPlayer: async(parent, args, {db}) => {
            return 0;
        },
        //updatePlayer
        updatePlayer: async(parent, args, {db}) => {
            return 0;
        },
        //removePlayer
        removePlayer: async(parent, args, {db}) => {
            db.Player = db.Player.filter(p => p.id !== args.id);
            return true;
        }
    },
    types: {

    }

};