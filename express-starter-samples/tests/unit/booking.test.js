const {
    Model,
    registerBooking
} = require("../../models/booking");
const Doctor = require("../../models/doctor");
require("jest");


describe("testing the booking model", function () {

    let booking={};
   beforeEach(function(){
      booking = {
        bookingAmount: 400,
        doctorId: 2
    };

   });
    it("should reject the reservation at amount greater than the balance", function () {


       
        booking.save = function () {

        };
        //mocking findOne of mongoose model
        Doctor.findOne = jest.fn();
        Doctor.findOne.mockResolvedValue({balance:200});
        
      
       // act on booking
        //assert calling registration throw an error

        let err="";
        registerBooking(booking).then(
            function()
        {
            throw new Error("test should fail");
        })
        .catch(
            function(e)
        { console.log(e);expect(e).toEqual(new Error("Balance not enough for booking at this clinic"));
    });
       
    

    })

    it("should accept booking when balance is greater than the amount", function () {


       
        booking.save = function () {

        };
        //mocking findOne of mongoose model
        Doctor.findOne = jest.fn();
        Doctor.findOne.mockResolvedValue({balance:200});
        
      
       // act on booking
        //assert calling registration throw an error

       
        registerBooking(booking).then(
            function(msg)
        {
            expect(msg).toBe("Booking completed successfully");return;
        });
       
        var msg="";
        expect(msg).toBe("Booking completed successfully");
       
    

    })


})