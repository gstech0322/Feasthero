export default class CalculateTotals {
    static totals(bookingSize, costPerDevice, mealKitCost, bookingSizeWithMealKit, mealKitsBooked) {
        let mealKitsTotal = 0;
        if (mealKitsBooked)
            mealKitsTotal = this._mealKitsTotal(mealKitCost, bookingSizeWithMealKit);

        const devicesTotal = this._devicesTotal(costPerDevice, bookingSize)
        const subTotal = this._subTotal(devicesTotal, mealKitsTotal);
        const tax = this._tax(subTotal);
        const grandTotal = this._grandTotal(tax, subTotal);

        return {
            tax: Number(tax.toFixed(2)),
            mealKitsTotal:  Number(mealKitsTotal.toFixed(2)),
            devicesTotal:  Number(devicesTotal.toFixed(2)),
            grandTotal:  Number(grandTotal.toFixed(2)),
            subTotal:  Number(subTotal.toFixed(2)),
        }
    }

    static _devicesTotal(costPerDevice, bookingSize) {
        return costPerDevice * bookingSize;
    }

    static _mealKitsTotal(mealKitCost, bookingSizeWithMealKit) {
        return mealKitCost * bookingSizeWithMealKit;
    }

    static _subTotal(devicesTotal, mealKitsTotal) {
        return devicesTotal + mealKitsTotal;
    }

    static _tax(subTotal) {
        return subTotal * 0.13;
    }

    static _grandTotal(tax, subTotal) {
        return tax + subTotal;
    }
}
