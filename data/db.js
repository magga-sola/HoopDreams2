const playerSchema = require("../mongoose/models/Player");
const pickupGameSchema = require("../mongoose/models/PickupGame");
const signupPlayerSchema = require("../mongoose/models/SignupPlayer");
const basketballFieldSchema = require("../mongoose/models/BasketballField");
const mongoose = require("mongoose");


mongoose.connect(
    "mongodb+srv://eva:eva@hoopdreamscluster.irlk9.gcp.mongodb.net/test",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

module.exports = {
    db: db,
    Player: mongoose.model("Player", playerSchema),
    PickupGame: mongoose.model("PickupGame", pickupGameSchema),
    SignupPlayer: mongoose.model("SignupPlayer", signupPlayerSchema),
    BasketballField: mongoose.model("BasketballField", basketballFieldSchema)
};

