// • (5%) allPlayers - Should return a collection of all players
// • (5%) player - Should return a specific player by id 
// • (5%) createPlayer - Create a player and returns the newly created player matching the Player type
// • (5%) updatePlayer - Updates a player by id and returns the updated player matching the Player type
// • (5%) removePlayer - Marks a player as deleted and returns either true or an error if something happened
const errors = require("../errors");
//const db = require("../data/db");

module.exports = {
    queries: {
        //query AllPlayers{ allPlayers{id, name}}
        allPlayers: async (parent, args, { db }) => {
            return (await db.Player.find({})).filter(p => p.deleted === false);
        },
        //query getPlayer{player(id:"5da9d82f8e966429fc2911a5"){id,name}}
        player: async (parent, args, { db }) => {
            const player = await db.Player.findById(args.id);
            if (player != null || !player.deleted) {
                return player;
            } else {
                throw new errors.NotFoundError();
            }
        }
    },
    mutations: {
        //mutation addPlayer{createPlayer(input:{name:"Lebron"}){id,name}}
        createPlayer: async (parent, args, { db }) => {
            return await db.Player.create(args.input);
        },
        //mutation updatePlayer{updatePlayer(id:"5da9d82f8e966429fc2911a5",name:"Birkir"){id,name}}
        updatePlayer: async (parent, args, { db }) => {
            const player = await db.Player.findById(args.id);
            if (player != null || !player.deleted) {
                return await db.Player.findByIdAndUpdate(
                    args.id,
                    { name: args.name },
                    { new: true }
                );
            } else {
                throw new errors.NotFoundError();
            }
        },
        //mutation deletePlayer{deletePlayer(id:"5da9defbfd5e2e28707ccc71"){id,name}}
        deletePlayer: async (parent, args, { db }) => {
            const player = await db.Player.findById(args.id);
            if (player != null || !player.deleted) {
                await db.Player.findByIdAndUpdate(
                    args.id,
                    { deleted: true },
                    { new: true }
                );
                return true;
            } else {
                throw new errors.NotFoundError();
            }
        }
    }
};