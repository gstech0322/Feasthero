const { mailSender, getMessageTemplate } = require('../../../services/send_email');
const customerBookingConfirmedEmailTemplate = require('../templates/customer_booking_confirmed_template')
const genCustomerBookingConfirmedData = require('../templates/customer_booking_confirmed_data');
const chefBookingConfirmedEmailTemplate = require('../templates/chef_booking_confirmed_template');
const genChefBookingConfirmedData = require('../templates/chef_booking_confirmed_data');
const ClassQueryBuilder = require('../../classes/services/class_query_builder');

class SendConfirmedEmails {
    constructor(bookingDetails) {
        this.bookingDetails = bookingDetails;
    }

    async sendMailToChefAndCustomer() {
        const query = new ClassQueryBuilder().filterByClassId(this.bookingDetails.classId).includeChef().onlyFirstIndex();
        let classData = await query.run();
        await this._sendMailToCustomer(classData);
        await this._sendMailToChef(classData);
    }

    async _sendMailToCustomer(classData) {
        let msg = getMessageTemplate();
        msg.to = this.bookingDetails.customerEmail;
        msg.subject = "FeastHero Class Booking Confirmation";
        msg.html = customerBookingConfirmedEmailTemplate(genCustomerBookingConfirmedData(classData, this.bookingDetails));
        await mailSender(msg);
    };

    async _sendMailToChef(classData) {
        let msg = getMessageTemplate();
        msg.to = classData.chefs[0].email;
        msg.subject = ` FeastHero Class ${classData.title} Slot Booked`;
        msg.html = chefBookingConfirmedEmailTemplate(genChefBookingConfirmedData(classData, this.bookingDetails));
        await mailSender(msg);
    };

}

module.exports = SendConfirmedEmails;