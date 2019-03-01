function putAccountInSession(session, account) {
    session.account = account;
    session.save();
}

module.exports = putAccountInSession;