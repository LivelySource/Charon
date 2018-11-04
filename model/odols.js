const mongoose = require("mongoose");

const odolsSchema = mongoose.Schema({
    userID: String,
    serverID: String,
    odols: Number
})

module.exports = mongoose.model("Odols", odolsSchema);