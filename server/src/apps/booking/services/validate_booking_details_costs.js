const CalculateTotals = require('../../../helpers/calculate_totals');

class ValidateBookingDetailsCosts {
    constructor(bookingDetails, classData) {
        this.bookingDetails = bookingDetails;
        this.classData = classData;
        this.totals = CalculateTotals.totals(
            bookingDetails.bookingSize, classData.costPerDevice,
            classData.mealKitCost, bookingDetails.bookingSize,
            bookingDetails.mealKitsBooked
        );
    }

    validate() {
        const validations = [
            this.tax(), this.mealKitsTotal(), this.devicesTotal(),
            this.grandTotal(), this.devicesTotal(),
        ];
        const valid = Object.values(validations).every(validation => validation === true);
        if (!valid)
            return 'totals do not add up, please try again'
    }

    tax() {
        return this.totals.tax === this.bookingDetails.tax;
    }

    mealKitsTotal() {
        return this.totals.mealKitsTotal === this.bookingDetails.mealKitsTotal;
    }

    devicesTotal() {
        return this.totals.devicesTotal === this.bookingDetails.devicesTotal
    }

    grandTotal() {
        return this.totals.grandTotal === this.bookingDetails.grandTotal
    }

    subTotal() {
        return this.totals.subTotal === this.bookingDetails.subTotal
    }
}

module.exports = ValidateBookingDetailsCosts;