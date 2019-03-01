const express = require('express');
const accountsRouter = express.Router();;
const wait = require('../../middleware/async');
const withAuth = require('../../middleware/with_auth');
const getAccount = require('./controllers/get_account');
const setAccountInSession = require('./controllers/set_account_in_session');

accountsRouter.get('/get-account', withAuth, getAccount);
accountsRouter.post('/put-account-in-session', setAccountInSession);

module.exports = accountsRouter;