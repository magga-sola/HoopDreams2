const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    name: { type: String, required: true },
    playedGames: [{ type: mongoose.Types.ObjectId, ref: "PickupGame" }],
});