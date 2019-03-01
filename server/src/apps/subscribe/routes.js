const express = require('express');
const subscribeRouter = express.Router();
const wait = require('../../middleware/async');
const subscribe = require('./controllers/subscribe');

subscribeRouter.post('/', wait(subscribe));

module.exports = subscribeRouter;