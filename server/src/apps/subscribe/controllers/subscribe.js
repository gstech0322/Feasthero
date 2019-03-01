const Subscription = require("../schema/subscription");
const { StatusCodes } = require("http-status-codes");

async function subscribe(req, res) {
    const subscriptionData = req.body;
    const subscription = Subscription(subscriptionData);
    Subscription.find({ email: subscription.email }, function (_, docs) {
        if (docs.length) {
            return res.status(StatusCodes.CONFLICT).json({ errors: { error: 'email already exists' } });
        } else {
            subscription
                .save()
                .then((subscription) => {
                    return res.status(StatusCodes.OK).json(subscription._id);
                })
                .catch((_) => {
                    return res
                        .status(StatusCodes.INTERNAL_SERVER_ERROR)
                        .send({ errors: { error: "failed to subscribe" } });
                });
        }
    })
}

module.exports = subscribe;