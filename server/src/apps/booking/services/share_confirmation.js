const { getMessageTemplate, mailSender } = require('../../../services/send_email');
const genCustomerBookingConfirmedData = require('../templates/customer_booking_confirmed_data');
const customerBookingConfirmedEmailTemplate = require('../templates/customer_booking_confirmed_template');

async function shareConfirmation(emails, bookingDetails, classData) {
    let msg = getMessageTemplate()

    const text = customerBookingConfirmedEmailTemplate(genCustomerBookingConfirmedData(classData, bookingDetails));

    msg.to = 'bookings@feasthero.com'
    msg.bcc = emails;
    msg.subject = "FeastHero Class Booking Confirmation";
    msg.html = preAppendSignature(
        text,
        bookingDetails.customerFirstName);
        
    await mailSender(msg);
}

function preAppendSignature(text, name) {
    return `Forwarded from ${name}\n\n` + text;
}

module.exports = shareConfirmation;