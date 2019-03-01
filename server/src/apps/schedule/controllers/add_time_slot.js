const TimeSlot = require('../schema/time_slot');

const { StatusCodes } = require('http-status-codes');

async function addTimeSlot(req, res) {
    const requestData = req.body;
    const timeSlot = new TimeSlot(requestData);

    return timeSlot.save()
        .then((_) => {
            return res.status(StatusCodes.OK).json({ timeSlot });
        })
        .catch((_) => {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: { error: 'add time slot failed' } })
        });
}

module.exports = addTimeSlot;