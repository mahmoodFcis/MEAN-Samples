const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
var userSchema = new mongoose.Schema({

    userName: {
        type: String,
        minlength: 5,
        maxlength: 20,
        lowercase: true,
        trim: true,
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
                return new Promise((resolve, rejection) => {
                    setTimeout(function () {
                        resolve(e > new Date("1/1/2019"));
                    }, 4000);

                });
            },
            message: (e) => {
                return "Date is not greater or equal to 1/1/2019";
            }
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
        get: function (e) {
            return Math.round(e);
        },
        set: function (e) {
            return Math.round(e);
        },
        type: Number
    }
});
userSchema.methods.validatePassword = async function(_password) {
    try
    {

    isMatched = await bcrypt.compare(_password, this.password);
    console.log(isMatched);
    return isMatched;
    }
    catch(e)
    {
        console.error(e);
        throw new Error(e);
    }
}
userSchema.methods.generateAuthToken = function () {
    try {
        var token = jwt.sign({
            userName: this.userName,
            role: this.roles,
            email: this.email
        }, config.get("JWT_PrivateKey"));
        return token;
    } catch (e) {
        console.error(e);
        throw new Error("Signing token failed");
    }

}
var User = mongoose.model("User", userSchema);

var getByUserName = async function (_userName) {
    var user = await User.findOne({
        userName: _userName
    });
    return user;
}



/// adding schema for user roles

const UserRole = mongoose.model("UserRoles", new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "User", "Customer"]
    }

}));


module.exports.User = User;
module.exports.getByUserName = getByUserName;
module.exports.UserRole = UserRole;
