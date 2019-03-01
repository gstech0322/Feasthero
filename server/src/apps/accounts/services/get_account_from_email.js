const Account = require("../../accounts/schema/account");

async function getAccountFromEmail(email) {
    return (await Account.find({ email: email }))[0];
}

module.exports = getAccountFromEmail;