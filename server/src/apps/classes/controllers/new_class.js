const { StatusCodes } = require("http-status-codes");
const Class = require('../schema/class');

async function newClass(req, res) {
    const { classData } = res.locals;

    classData.chefId = req.session.account._id;

    let class_ = new Class(classData);

    return class_
        .save()
        .then((class_) => {
            return res.status(StatusCodes.OK).json(class_);
        })
        .catch((_) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
                "Class insert Failed , please try again"
            );
        });
};

module.exports = newClass;