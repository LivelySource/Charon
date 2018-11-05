const mongoose = require("mongoose");

const odolsSchema = mongoose.Schema({
    user: String,
    userID: String,
    server: String,
    serverID: String,
    odols: Number
})

module.exports = mongoose.model("Odols", odolsSchema);