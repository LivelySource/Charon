const mongoose = require("mongoose");

const banSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    userID: String,
    reason: String,
    staff: String,
    staffID: String,
    server: String,
    serverID: String,
    time: String
})
module.exports = mongoose.model("Bans", banSchema)