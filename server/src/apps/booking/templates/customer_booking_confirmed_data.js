const moment = require("moment");
const dateTimeToMoment = require("../../../helpers/date_time_to_moment");

function genCustomerBookingConfirmedData(classData, orderDetails) {
    return {
        firstName: orderDetails.customerFirstName,
        chefName: classData.chefs[0].firstName + '' + classData.chefs[0].firstName ,
        className: classData.title,
        selectedClassDateTime: dateTimeToMoment(new Date(orderDetails.selectedClassDateTime)),
        zoomLink: classData.chefs[0].profile.zoom,
        classDescription: classData.description,
        recipe: classData.recipe,
    }
}

module.exports = genCustomerBookingConfirmedData;