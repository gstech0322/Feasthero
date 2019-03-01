const { StatusCodes } = require('http-status-codes');
const Class = require("../schema/class");

async function updateClass(req, res) {
    const classId = req.params.classId;
    const { classData } = res.locals;

    return Class.findOneAndUpdate({ '_id': classId }, classData, { useFindAndModify: false, omitUndefined: true }, function (err, _) {
        if (err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { error: err } });
        return res.status(StatusCodes.OK).send('ok');
    })
}

module.exports = updateClass;