const moment = require("moment");

function genChefBookingConfirmedData(classData, orderDetails) {
    return {
        chefName: classData.chefs[0].name,
        className: classData.title,
        selectedClassDateTime: orderDetails.selectedClassDateTime,
    }
}

module.exports = genChefBookingConfirmedData;