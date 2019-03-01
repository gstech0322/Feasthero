const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Customer = new Schema({
    _id: false,
    id: false
});

module.exports = mongoose.model("CustomerProfile", Customer);
