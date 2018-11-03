const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    reason: String,
    snitch: String,
    snitchID: String,
    server: String,
    serverID: String,
    time: String
})
module.exports = mongoose.model("Reports", reportSchema)