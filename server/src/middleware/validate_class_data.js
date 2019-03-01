const { StatusCodes } = require("http-status-codes");
const validateClassData = require("../apps/classes/services/validate_class_data");
const isEmpty = require("../helpers/is_empty");

function validateClassDataMiddleware(req, res, next) {
    const { classData } = res.locals;
    const errors = validateClassData(classData);

    // user may not want to update the thumbnail so if it's empty during an update let if fly
    if (classIsBeingUpdated(req.method))
        delete errors['thumbnail'];

    if (!isEmpty(errors))
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors });

    next();
}



function classIsBeingUpdated(method) {
    return method === "PATCH";
}

module.exports = validateClassDataMiddleware;