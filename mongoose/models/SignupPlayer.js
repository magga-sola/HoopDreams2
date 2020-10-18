const mongoose = require("mongoose");


module.exports = new mongoose.Schema({
    playerId: { type: mongoose.Types.ObjectId, required: true, ref: 'Player' },
    pickupGameId: { type: String, required: true, ref: 'PickupGame' }
});