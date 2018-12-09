
const mongoose=require("mongoose");

var userSchema=new mongoose.Schema({

    userName:{type:String,required:true,unique:true},
    email:String,
    creationDate:{type:Date,default:Date.now()},
    roles:[String],
    gender:Number,
    password:{type:String,required:true},
    age:Number
});

var User=mongoose.model("User",userSchema);

var getByUserName=async function(_userName)
{
    var user=await User.findOne({userName:_userName});
    return user;
}

module.exports.User=User;
module.exports.getByUserName=getByUserName;

