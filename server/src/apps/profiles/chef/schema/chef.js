const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Chef = new Schema({
    _id: false,
    id: false,
    photo: String,
    zoom: String,
    bio: String,
});

module.exports = mongoose.model("ChefProfile", Chef);
