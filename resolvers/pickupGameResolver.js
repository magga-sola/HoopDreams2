const db = require('../data/db');
const errors = require('../errors');
const dbPickupGame = require('../data/db').PickupGame;

module.exports = {
    queries: {
        allPickupGames: async () => {
            try {
                const allPickupGames = dbPickupGame.find({});
                return allPickupGames;
            } catch (e) {
                console.log("e", e);
                return [];
            }

        },
        pickupGame: async (obj, {id}) => {
            console.log(id);
            try {
                const foundPickupGame = await dbPickupGame.findById(id);
                return foundPickupGame;
            } catch(e) {
                console.log("e", e);
                return {}
            }
        }

    },
    mutations: {
        createPickupGame: async(parent, args) => {

            //find the basketballfield and host of the game
            const pickupGameBasketballField = await db.BasketballField.findById(args.input.location);
            const pickupGameHost = db.Player.findById(args.input.host);


            // can't add game with a closed basketballfield
            if (pickupGameBasketballField == "CLOSED") {
                throw new errors.BasketballFieldClosedError();
            }

            // actually create the game
            const newPickupGame = {
                start: args.input.start.value,
                end: args.input.end.value,
                location: pickupGameBasketballField,
                host:pickupGameHost
            }

            return dbPickupGame.create(newPickupGame);
        },

        addPlayerToPickupGame: async(parent, args) => {
            //get the player we need to add
            const player = await db.Player.findById(args.input.playerId);
            const game = await dbPickupGame.findById(args.input.pickupGameId);

            // check them both
            if (player != null && game != null){
                // update the player
                const updatedPlayer = await db.Player.findByIdAndUpdate(
                    args.input.playerId,
                    { $push: { playedGames: game}}
                );
                const updatedGame = await dbPickupGame.findByIdAndUpdate(
                  args.input.pickupGameId,
                    { $push: { registeredPlayers: player }}
                );

                //return the updated game
                return updatedGame;

            } else {
                throw new errors.NotFoundError();
            }
        },


        removePlayerFromPickupGame: async(parent, args) => {
            //get the game and player
            const player = await db.Player.findById(args.input.playerId);
            const game = await dbPickupGame.findById(args.input.pickupGameId);

            //check them both
            if (player != null && game != null) {
                const updatedPlayer = await db.Player.findByIdAndUpdate(
                    args.input.playerId,
                    {$pull: {playedGames: game}}

                );
                const updatedGame = await dbPickupGame.findByIdAndUpdate(
                  args.input.pickupGameId,
                    { $pull: {registeredPlayers: player}}
                );

            } else {
                throw new errors.NotFoundError();
            }

            },

        removePickupGame: async(parent, args) => {
            const pickupGame = dbPickupGame.findById(args.id);
            if (pickupGame != null){
                dbPickupGame.findByIdAndDelete(args.id);
                return true;

            }else {
                return errors.NotFoundError();
            }
        },

    }
};