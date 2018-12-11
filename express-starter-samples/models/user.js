const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({

    userName: {
        type: String,
        minlength: 5,
        maxlength: 20,
        lowercase:true,trim:true,
        required: function () {
            return this.age < 20;
        },
        unique: true
    },
    email: {
        type: String,
        validate: {
            validator: function (e) {
                return e.length > 10;
            },
            message: "Email length is not correct"
        },
        required: true
    },
    creationDate: {
        type: Date,
        validate: {

            validator: function (e) {
                return new Promise((resolve,rejection) => {
                    setTimeout(function () {
                        resolve(e > new Date("1/1/2019"));
                    }, 4000);

                });
            },
            message:(e)=>{return "Date is not greater or equal to 1/1/2019";}
        }
    },
    roles: [String],
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    password: {
        type: String,
        required: [true, "this is field is required"]
    },
    age: {
        min: 10,
        max: 60,
        get:function(e){return Math.round(e);},
        set:function(e){return Math.round(e);},
        type: Number
    }
});

var User = mongoose.model("User", userSchema);

var getByUserName = async function (_userName) {
    var user = await User.findOne({
        userName: _userName
    });
    return user;
}

module.exports.User = User;
module.exports.getByUserName = getByUserName;
