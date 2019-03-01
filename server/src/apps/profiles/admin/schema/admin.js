const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema({
    _id: false,
    id: false
});

module.exports = mongoose.model("AdminProfile", Admin);
