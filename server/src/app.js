const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo');

const { connectToDb } = require('./database/connect.js');
const { settings } = require("./feasthero/settings.js");

const classesRouter = require('./apps/classes/routes');
const bookingRouter = require('./apps/booking/routes');
const contactRouter = require('./apps/contact/routes');
const subscribeRouter = require("./apps/subscribe/routes");
const blogRouter = require('./apps/blog/routes');

const errorMiddleware = require('./middleware/error');
const authRouter = require("./apps/auth/routes.js");
const accountsRouter = require("./apps/accounts/routes.js");
const upload = require("./middleware/upload_image.js");
const chefRouter = require("./apps/profiles/chef/routes.js");
const scheduleRouter = require("./apps/schedule/routes.js");

function init() {
  connectToDb();
  initMiddleware();
  initRoutes();
}


function initMiddleware() {
  app.use(cors({ origin: settings.CLIENT_ORIGIN, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(errorMiddleware);
  app.use(cookieParser());
  app.use(upload.any());
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: settings.MONGO_URI,
    }),
  }));
}


function initRoutes() {
  app.use('/classes', classesRouter);
  app.use('/booking', bookingRouter);
  app.use('/contact', contactRouter);
  app.use('/subscribe', subscribeRouter);
  app.use('/blog', blogRouter);
  app.use('/auth', authRouter);
  app.use('/accounts', accountsRouter);
  app.use('/chef', chefRouter);
  app.use('/schedule', scheduleRouter);
}

init();

module.exports = app;