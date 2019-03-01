const BookingSizeValidator = require('../../../validators/booking_size');
const EmailValidator = require('../../../validators/email');
const NameValidator = require('../../../validators/name');
const NotEmptyValidator = require('../../../validators/not_empty');
const BooleanValidator = require('../../../validators/boolean');
const DateTimeValidator = require('../../../validators/datetime');
const ValidateBookingDetailsCosts = require('./validate_booking_details_costs');
const cleanErrors = require('../../../helpers/clean_errors');

class ValidateBookingDetails {
    constructor(bookingDetails, classData) {
        this.validateBookingDetailsCosts = new ValidateBookingDetailsCosts(bookingDetails, classData);
        this.bookingDetails = bookingDetails;
        this.classData = classData;
    }

    async validate() {
        let errors = {};
        errors['error'] = this.validateBookingDetailsCosts.validate();
        errors['selectedClassDateTime'] = this.selectedTimeSlotId();
        errors['selectedClassDateTime'] = this.selectedClassDateTime();
        errors['bookingSize'] = this.bookingSize();
        errors['customerEmail'] = this.customerEmail();
        errors['customerFirstName'] = this.firstName();
        errors['customerLastName'] = this.lastName();
        errors['companyName'] = this.companyName();
        errors['mealKitsBooked'] = this.mealKitsBooked();

        return cleanErrors(errors);
    }

    bookingSize() {
        return BookingSizeValidator.validate(this.bookingDetails.bookingSize);
    }

    selectedClassDateTime() {
        return DateTimeValidator.validate(this.bookingDetails.selectedClassDateTime, this.classData.schedule)
    }

    selectedTimeSlotId() {
        return NotEmptyValidator.validate(this.bookingDetails.timeSlotId);
    }

    customerEmail() {
        return EmailValidator.validate(this.bookingDetails.customerEmail)
    }

    firstName() {
        return NameValidator.validate(this.bookingDetails.customerFirstName);
    }

    lastName() {
        return NameValidator.validate(this.bookingDetails.customerLastName);
    }

    companyName() {
        return NotEmptyValidator.validate(this.bookingDetails.companyName);
    }

    mealKitsBooked() {
        return BooleanValidator.validate(this.bookingDetails.mealKitsBooked);
    }
}

module.exports = ValidateBookingDetails;