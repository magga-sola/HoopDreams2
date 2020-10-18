const db = require('../data/db');
const errors = require('../errors');
const dbPickupGame = require('../data/db').PickupGame;
const dbBasketballField = require('../data/db').BasketballField;
const dbPlayer = require('../data/db').Player;

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

            //find the basketballField and host of the game
            const pickupGameBasketballField = await db.BasketballField.findById(args.input.location);
            const pickupGameHost = db.Player.findById(args.input.host);


            // can't add game to a closed BasketballField
            if (pickupGameBasketballField.status == "CLOSED") {
                throw new errors.BasketballFieldClosedError();
            }

            // can't overlap with games with the same BasketballField
            pickupGameBasketballField.pickupGames.forEach( gameId => {
                let game = dbPickupGame.findById(gameId);
                if (game.start < args.input.end && args.input.start < game.end){
                    throw new errors.PickupGameOverlapError();
                }
            })

            // check if start and end date have passed
            if (args.input.start < Date.now() || args.input.end < Date.now()){
                throw new errors.PickupGameAlreadyPassedError();
            }
            // check if end date is before the start date
                else if (args.input.end < args.input.start){
                    throw new errors.UserInputError(args.input.end, args.input.start);
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

                // check if game has passed
                if (game.end < Date.now()){
                    throw new errors.PickupGameAlreadyPassedError();

                    //check if the basketballField is at maximum capacity
                } else if (game.location.capacity == 0) {
                    throw new errors.PickupGameExceedMaximumError();
                }

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

                // check if the game has passed
                if (game.end < Date.now()){
                    throw new errors.PickupGameAlreadyPassedError();
                }

                // check if player is in the game
                if (game.registeredPlayers.includes(player)) {

                const updatedPlayer = await db.Player.findByIdAndUpdate(
                    args.input.playerId,
                    {$pull: {playedGames: game}}

                );
                const updatedGame = await dbPickupGame.findByIdAndUpdate(
                  args.input.pickupGameId,
                    { $pull: {registeredPlayers: player}}
                );} else {
                    throw new error.UserInputError("Player is not registered in this game");
                }

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

    },
    types: {
        PickupGame: {
            location: async (parent, args) =>
                await dbBasketballField.findById(parent.location),

            host: async (parent, args) =>
                await dbPlayer.findById(parent.host),

            registeredPlayers: async (parent, args) => {
                const players = [];

                parent.registeredPlayers.forEach( playerId => {
                    let player = dbPlayer.findById(playerId);
                    players.push(player);
                })
                return players;
            }
        }
    },



};