const mongoose = require('mongoose');


module.exports = new mongoose.Schema({
    start: { type: String, required: true },
    end: { type: String, required: true },
    location: { type: String, ref:'BasketballField', required: true },
    registeredPlayers: [{ type: mongoose.Types.ObjectId, ref:'Player', required: true }],
    host: { type: mongoose.Types.ObjectId, ref: 'Player', required: true },
});