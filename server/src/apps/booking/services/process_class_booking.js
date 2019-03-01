const Booking = require('../schema/booking');
const { StatusCodes } = require("http-status-codes");
const ProcessPaymentService = require('./process_payment');
const TimeSlot = require('../../schedule/schema/time_slot');
const dateTimeToMoment = require('../../../helpers/date_time_to_moment')
const ObjectId = require('mongoose').Types.ObjectId;

class ProcessClassBookingService {
    constructor(bookingDetails, cardTokenId) {
        this.processPayment = new ProcessPaymentService(bookingDetails, cardTokenId);
        this.bookingDetails = bookingDetails;
    }

    async book() {
        if (await this._isClassBooked()) {
            return {
                statusCode: StatusCodes.BAD_REQUEST,
                errors: { errors: { booking: `${dateTimeToMoment(new Date(this.bookingDetails.selectedClassDateTime))} time slot is unavailable , please select a different slot` } }
            };
        }

        if ((await this.processPayment.process()) === false) {
            return {
                statusCode: StatusCodes.BAD_REQUEST,
                errors: { errors: { payment: 'payment failed' } }
            }
        }

        await this._bookSlot();

        let bookedClass = await this._saveBookedClass();
        if (!bookedClass) {
            return {
                statusCode: StatusCodes.BAD_REQUEST,
                errors: { errors: { booking: 'class booking failed' } }
            }
        } else {
            return {
                statusCode: StatusCodes.OK,
                bookedClassId: bookedClass,
            }
        }
    }

    async _isClassBooked() {
        const bookedSlot = await TimeSlot.findOne({
            classId: ObjectId(this.bookingDetails.classId),
            _id: ObjectId(this.bookingDetails.timeSlotId),
        });
        return bookedSlot.available === false;
    }

    async _bookSlot() {
        await TimeSlot.updateOne(
            {
                classId: ObjectId(this.bookingDetails.classId),
                _id: ObjectId(this.bookingDetails.timeSlotId),
            },
            { available: false }
        )
    }

    async _saveBookedClass() {
        let bookedClass = new Booking(this.bookingDetails);
        return bookedClass
            .save()
            .then((bookedClass) => { return bookedClass._id })
            .catch((_) => { return false });
    }
}

module.exports = ProcessClassBookingService;