const { StatusCodes } = require("http-status-codes");
const Class = require("../schema/class");

async function deleteClass(req, res) {
    const classId = req.params.classId;

    return await Class.deleteOne({ _id: classId }, function (err, doc) {
        if (!doc.acknowledged && doc.deletedCount !== 1)
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: { error: 'class does not exist' } });
        if (err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { error: err } });
        if (!err)
            return res.status(StatusCodes.OK).json('ok');

    });
}

module.exports = deleteClass;