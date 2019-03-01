const { settings } = require('../../../feasthero/settings');
const stripe = require('stripe')(settings.stripe.SECRET_KEY);


describe('book class', function () {
    it('booking a class', async function () {
        await createCardToken();
    });
});


async function createCardToken() {
    return await stripe.tokens.create({
        card: {
            number: '4242424242424242',
            exp_month: 7,
            exp_year: 2020,
            cvc: '314',
        },
    })
        .then((tkn) => tkn)
        .catch((err) => { throw new Error(`failed to create card token: ${err}`) })
}