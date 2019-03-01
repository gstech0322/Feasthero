const { StatusCodes } = require('http-status-codes');
const ClassQueryBuilder = require('../../../classes/services/class_query_builder');

async function allClasses(req, res) {
    const query = new ClassQueryBuilder().filterByChefId(req.session.account._id).includeSchedule().sortSchedule();
    const classes = await query.run();
    return res.status(StatusCodes.OK).json(classes);
}

module.exports = allClasses;