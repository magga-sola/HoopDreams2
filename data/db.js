const playerSchema = require("../mongoose/models/Player");
const pickupGameSchema = require("../mongoose/models/PickupGame");
const signupPlayerSchema = require("../mongoose/models/SignupPlayer");
const basketballFieldSchema = require("../mongoose/models/BasketballField");
const mongoose = require("mongoose");
const uri = "mongodb+srv://eva:eva@hoopdreamscluster.irlk9.gcp.mongodb.net/test"


const connection = mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

module.exports = {
    connection,
    Player: mongoose.model("Player", playerSchema, 'Players'),
    PickupGame: mongoose.model("PickupGame", pickupGameSchema, 'PickupGames'),
    //SignupPlayer: mongoose.model("SignupPlayer", signupPlayerSchema, 'SignupPlayers'),
    BasketballField: mongoose.model("BasketballField", basketballFieldSchema, 'BasketballFields')
};
