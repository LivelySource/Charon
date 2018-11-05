const mongoose = require("mongoose");

const obolsSchema = mongoose.Schema({
    user: String,
    userID: String,
    server: String,
    serverID: String,
    obols: Number
})

module.exports = mongoose.model("Obols", obolsSchema);