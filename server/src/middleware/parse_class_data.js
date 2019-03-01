const ClassDataDto = require("../apps/classes/dtos/class_data");
const getThumbnailUrlFromReqFiles = require("../apps/classes/helpers/get_thumbnail_url_from_req_files");

function parseClassData(req, res, next) {
    const classData = ClassDataDto.fromJson(req.body);
    classData.setThumbnail(getThumbnailUrlFromReqFiles(req.files));
    res.locals.classData = classData;
    next();
}

module.exports = parseClassData;
