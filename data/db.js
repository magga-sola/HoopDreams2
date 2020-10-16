const mongoose = require('mongoose');

const uri = "mongodb+srv://eva:eva@hoopdreamscluster.irlk9.gcp.mongodb.net/test";

const connection = mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });
