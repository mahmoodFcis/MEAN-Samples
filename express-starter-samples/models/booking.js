const mongoose = require("mongoose");
const Doctor = require("../models/doctor");
var bookingSchema = mongoose.Schema;

var Booking = mongoose.model("booking", new bookingSchema({
    DoctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    bookingDate: Date,
    bookingAmount: Number,
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "clinic"

    }
}));


module.exports={registerBooking : async function(booking) {
    
      
        var doctor = await Doctor.findOne({
            _id: booking.doctorId
        });
        
        if (doctor.balance >= booking.bookingAmount) {
            booking.save();
            return "Booking completed successfully";

        } else {
            
           throw  new Error("Balance not enough for booking at this clinic");
    }
},
    BookingModel:Booking
}
