const errors = require("../errors");
const db = require('../data/db').connection;
const dbPlayers = require('../data/db').Player;
const dbPickupGames = require('../data/db').PickupGame;

module.exports = {
    queries: {

        //allPlayers
        allPlayers: async(parent, args) => {
            const players = await dbPlayers.find({});
            return players
        },

        //player
        player: async(parent, args) => {
            const Player = await dbPlayers.findById(args.id);
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
            const bool = await dbPlayers.create(args.input);
            return bool;
            // when should it be false? make sure this is dealt with!

        },

        //updatePlayer
        updatePlayer: async(parent, args) => {
            const player = await dbPlayers.findById(args.id);
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
            const player = dbPlayers.findById(args.id);
            if (player != null){
                dbPlayers.findByIdAndDelete(args.id)
                return true; //it returns a boolean right?
            } else {
                return errors.NotFoundError();
            }
        }
    },
    types: {
        Player: {
            playedGames: async (parent, args) => {
                const games = [];

                parent.playedGames.forEach( gameId => {
                    let game = dbPickupGames.findById(gameId);
                    games.push(game)
                })

                return games;
            }
        }
    }

};
