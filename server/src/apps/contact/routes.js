const express = require('express');
const contactRouter = express.Router();
const contact = require('./controllers/contact');
const validateReCaptcha = require('../../middleware/validate_recaptcha');

contactRouter.post("/email", validateReCaptcha, contact);

module.exports = contactRouter;