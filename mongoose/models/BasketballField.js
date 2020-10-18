const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    yearOfCreation: { type: String, required: true},
    pickupGames: [{type: mongoose.Types.ObjectId, ref:'PickupGame', required: true }],
    status: { type: String, required: true}
});