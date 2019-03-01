const express = require('express');

const wait = require('../../middleware/async');
const verifyChefIsAccessingTheirClass = require('../../middleware/verify_chef_is_accessing_their_class');
const verifyUserIsChef = require('../../middleware/verify_user_is_chef');
const addTimeSlot = require('./controllers/add_time_slot');
const deleteTimeSlot = require('./controllers/delete_time_slot');

const scheduleRouter = express.Router();

scheduleRouter.post('/add/timeslot', verifyUserIsChef, wait(verifyChefIsAccessingTheirClass), wait(addTimeSlot));
scheduleRouter.delete('/delete/timeslot/:slotId/class/:classId', verifyUserIsChef, wait(verifyChefIsAccessingTheirClass), wait(deleteTimeSlot));

module.exports = scheduleRouter;