const mongoose = require('mongoose');


module.exports = new mongoose.Schema({
    start: { type: String, required: true },
    end: { type: String, required: true },
    location: { type: String, ref:'BasketballField', required: true },
    registeredPlayers: [{ type: String, ref:'Player', required: true }],
    host: { type: String, ref: 'Player', required: true },
});