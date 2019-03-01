const moment = require('moment');

function chefBookingConfirmedEmailTemplate(emailData) {
    return `
    <p>Hi <b>${emailData.chefName}</b>, Your class <b>${emailData.className}</b>  has been booked  for the slot </p>
    <p>When: ${emailData.selectedClassDateTime}</p>
     `
}

module.exports = chefBookingConfirmedEmailTemplate;