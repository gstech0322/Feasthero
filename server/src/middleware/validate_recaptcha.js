const { StatusCodes } = require('http-status-codes');
require("es6-promise").polyfill();
require("isomorphic-fetch");

async function validateReCaptcha(req, res, next) {
    const { recaptchaData } = req.body;

    const isHuman = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaData}`
    })
        .then(res => res.json())
        .then(json => json.success)
        .catch(_ => false)

    if (recaptchaData === null || !isHuman)
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: { recaptcha: 'error validating recaptcha' } });

    next();
}

module.exports = validateReCaptcha;