let settings = {
    DEBUG: false,
    ORIGIN: '',
    CLIENT_ORIGIN: '',
    SESSION_SECRET: '',
    MONGO_URI: '',
    stripe: {
        PUBLISHIBLE_KEY: '',
        SECRET_KEY: '',
    },
    CLIENT_ID: '',
    CLIENT_ID_SECRET: '',
};

function initSettings() {
    require("dotenv").config();

    if (process.env.DEBUG === 'true')
        settings.DEBUG = true;
    else
        settings.DEBUG = false;

    settings.PORT = normalizePort(process.env.PORT || '8080');

    if (settings.DEBUG) {
        settings.ORIGIN = `http://${process.env.DOMAIN_NAME}:${settings.PORT}`;
        settings.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
        settings.MONGO_URI = process.env.MONGO_TEST_URI;
        settings.stripe.PUBLISHIBLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY_TEST;
        settings.stripe.SECRET_KEY = process.env.STRIPE_SECRET_KEY_TEST;
    } else {
        settings.ORIGIN = 'https://wwww.feasthero.herokuapp.com';
        settings.CLIENT_ORIGIN = 'https://www.feasthero.com';
        settings.MONGO_URI = process.env.MONGO_URI;
        settings.stripe.PUBLISHIBLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
        settings.stripe.SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    }

    return Object.freeze(settings);
}

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

module.exports = { initSettings, settings };