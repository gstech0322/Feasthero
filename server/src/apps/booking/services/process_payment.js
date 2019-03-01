const { settings } = require('../../../feasthero/settings');
const stripe = require('stripe')(settings.stripe.SECRET_KEY);
const SendConfirmedEmails = require('./send_confirmed_emails');

class ProcessPaymentService {
    constructor(bookingDetails, cardTokenId) {
        this.cardTokenId = cardTokenId;
        this.bookingDetails = bookingDetails;
    }
    async process() {
        const charge = await this._createCharge().then((charge) => charge).catch((error) => ({ error: error }));

        if (charge.error)
            return false;

        await (new SendConfirmedEmails(this.bookingDetails).sendMailToChefAndCustomer());
        return true;
    }

    _dollarsToCents(dollars) {
        return Math.floor(dollars * 100);
    }

    async _createCharge() {
        return await stripe.charges.create(
            {
                amount: this._dollarsToCents(this.bookingDetails.grandTotal),
                currency: 'cad',
                source: this.cardTokenId,
                description: `Payment for FeastHero class at ${this.bookingDetails.selectedClassDateTime}`,
                receipt_email: this.bookingDetails.customerEmail
            })
            .then((charge) => charge)
            .catch((error) => { throw new Error(`payment failed: ${error}`) });
    }

}

module.exports = ProcessPaymentService;