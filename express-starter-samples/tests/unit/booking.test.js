const {
    Model,
    registerBooking
} = require("../../models/booking");
const Doctor = require("../../models/doctor");
require("jest");


describe("testing the booking model", function () {

    let booking = {};
    beforeEach(function () {
        booking = {
            bookingAmount: 400,
            doctorId: 2
        };

    });
    it("should reject the reservation at amount greater than the balance", async function () {



        booking.save = function () {

        };
        
        //mocking findOne of mongoose model
        Doctor.findOne = jest.fn();
        Doctor.findOne.mockResolvedValue({ balance: 200 });
        // act on booking
        //assert calling registration throw an error
       expect(registerBooking(booking)).rejects.toEqual(new Error('Balance not enough for booking at this clinic'))
    })

    it("should accept booking when balance is greater than the amount", async function () {



        booking.save = function () {

        };
        //mocking findOne of mongoose model
        Doctor.findOne = jest.fn();
        Doctor.findOne.mockResolvedValue({ balance: 600 });

        // act on booking
        //assert calling registration throw an error
        var message=await registerBooking(booking);
               
        expect(message).toBe("Booking completed successfully");

       


    });
    


})