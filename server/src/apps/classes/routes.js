const express = require('express');
const classesRouter = express.Router();
const newClass = require('./controllers/new_class');
const wait = require('../../middleware/async');
const deleteClass = require('./controllers/delete_class');
const updateClass = require('./controllers/update_class');
const verifyChefIsAccessingTheirClass = require('../../middleware/verify_chef_is_accessing_their_class');
const validateClassDataMiddleware = require('../../middleware/validate_class_data');
const upload = require('../../middleware/upload_image');
const parseClassData = require('../../middleware/parse_class_data');
const findClassFilteredForBooking = require('./controllers/find_class_filtered_for_booking');
const allClassesFilteredForBooking = require('./controllers/all_classes_filtered_for_booking');
const verifyUserIsChef = require('../../middleware/verify_user_is_chef');

classesRouter.post('/new', verifyUserIsChef, parseClassData, validateClassDataMiddleware, upload.single('thumbnail'), wait(newClass));
classesRouter.delete('/class/:classId', verifyUserIsChef, wait(verifyChefIsAccessingTheirClass), wait(deleteClass))
classesRouter.patch('/class/:classId', verifyUserIsChef, parseClassData, wait(verifyChefIsAccessingTheirClass), validateClassDataMiddleware, upload.single('thumbnail'), wait(updateClass))
classesRouter.get('/filter/booking/all', wait(allClassesFilteredForBooking));
classesRouter.get('/filter/booking/:classId', wait(findClassFilteredForBooking));

module.exports = classesRouter;