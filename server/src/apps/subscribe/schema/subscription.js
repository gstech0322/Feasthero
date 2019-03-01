const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Subscription = new Schema({
    email: String,
})

module.exports = mongoose.model('Subscriptions', Subscription);
