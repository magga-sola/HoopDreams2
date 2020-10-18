const mongoose = require("mongoose");


module.exports = new mongoose.Schema({
    playerId: { type: mongoose.Types.ObjectId, required: true, ref: 'Player' },
    pickupGameId: { type: mongoose.Types.ObjectId, required: true, ref: 'PickupGame' }
});