const express = require('express');
const wait = require('../../../middleware/async');
const verifyChefIsAccessingTheirClass = require('../../../middleware/verify_chef_is_accessing_their_class');
const verifyUserIsChef = require('../../../middleware/verify_user_is_chef');
const withAuth = require('../../../middleware/with_auth');
const allClasses = require('./controllers/all_classes');
const findClass = require('./controllers/find_class');
const chefRouter = express.Router();

chefRouter.get('/classes/all', withAuth, verifyUserIsChef, wait(allClasses));
chefRouter.get('/classes/:classId', withAuth, verifyUserIsChef, wait(verifyChefIsAccessingTheirClass), wait(findClass))

module.exports = chefRouter;