const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

let Booking = new Schema({
  classId: ObjectId,
  timeSlotId: ObjectId,
  customerEmail: String,
  customerFirstName: String,
  customerLastName: String,
  companyName: String,
  bookingSize: Number,
  subTotal: Number,
  grandTotal: Number,
  tax: Number,
  selectedClassDateTime: {
    type: Date,
    default: new Date(),
  },
  mealKitsBooked: Boolean,
  mealKitsTotal: Number,
  devicesTotal: Number,
});

module.exports = mongoose.model("Booking", Booking);
