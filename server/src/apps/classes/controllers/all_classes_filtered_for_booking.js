const { StatusCodes } = require("http-status-codes");
const ClassQueryBuilder = require('../services/class_query_builder');

async function allClassesFilteredForBooking(_, res) {
    const query = new ClassQueryBuilder().includeChef().hideImportantChefDetails().onlyIncludeBookableTimeSlots().includeSchedule().sortSchedule();
    let classes = await query.run()
        .then((response) => response)
        .catch((error) => ({ error: error }));

    if (classes.error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: classes.error });

    return res.status(StatusCodes.OK).json(classes);
};

module.exports = allClassesFilteredForBooking;