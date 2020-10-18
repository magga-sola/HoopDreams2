const errors = require("../errors");
const db = require('../data/db').connection;
const Players = require('../data/db').Player;

module.exports = {
    queries: {

        //allPlayers
        allPlayers: async(parent, args) => {
            const players = await Players.find({});
            return players
        },

        //player
        player: async(parent, args) => {
            const Player = await Players.findById(args.id);
            if (Player != null) {
                return Player;
            } else {
                throw new errors.NotFoundError();
            }
        }

    },
    mutations: {

        //createPlayer
        createPlayer: async(parent, args) => {
            const bool = await db.Player.create(args.input);
            return bool;
            // when should it be false? make sure this is dealt with!

        },

        //updatePlayer
        updatePlayer: async(parent, args) => {
            const player = await Players.findById(args.id);
            if (player != null) {
                return await db.Player.findByIdAndUpdate(
                    args.id,
                    {name: args.name},
                    );

            } else {
                throw new errors.NotFoundError();
            }
        },

        //removePlayer
        removePlayer: async(parent, args) => {
            const player = db.Player.findById(args.id);
            if (player != null){
                db.Player.findByIdAndDelete(args.id)
                return true; //it returns a boolean right?
            } else {
                return errors.NotFoundError();
            }
        }
    }
};