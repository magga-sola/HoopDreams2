const playerSchema = require("../mongoose/models/Player");
const pickupGameSchema = require("../mongoose/models/PickupGame");
const signupPlayerSchema = require("../mongoose/models/SignupPlayer");
const basketballFieldSchema = require("../mongoose/models/BasketballField");
const mongoose = require("mongoose");


const uri = "mongodb+srv://eva:eva@hoopdreamscluster.irlk9.gcp.mongodb.net/HoopDreamsDatabase"


const connection = mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const Player = connection.model("Player", playerSchema, 'Players');
const PickupGame = connection.model("PickupGame", pickupGameSchema, 'PickupGames');
const BasketballField = connection.model("BasketballField", basketballFieldSchema, 'BasketballFields')

module.exports = {
    connection,
    Player,
    PickupGame,
    BasketballField
};
