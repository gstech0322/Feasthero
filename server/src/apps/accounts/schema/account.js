const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bcrypt = require("bcryptjs");

const Account = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    type: String,
    password: {
        type: String,
        set: getHashedPassword,
    },
    profile: Schema.Types.Mixed,
});

function getHashedPassword(password) {
    if (!(this instanceof mongoose.Document)) {
        return password;
    }
    return Bcrypt.hashSync(password, 10);
}

module.exports = mongoose.model("Account", Account);
