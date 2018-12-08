const express = require("express");
const router = express.Router();
const joi=require("joi");
var users = [{
    userName: "Ahmed",
    fullName: "Ahmed Saad",
    age: 30
}, {
    userName: "Saleh",
    fullName: "Ahmed Hanafey",
    age: 56
}, {
    userName: "Ali",
    fullName: "Ahmed Saad",
    age: 39
}]
router.get("/", (req, res) => {

    res.send(users);
})

router.get("/:userName", (req, res) => {
    var _userName = req.params.userName;
    if (_userName) {
        var user = users.find(e=>{return e.userName.toLowerCase()===_userName.toLowerCase()});
        res.send(user);
    } else res.status(404).send("user does not exist");
});

router.post("/", (req, res)=> {

  var schema={"userName":joi.string().min(4).max(20).required(), 
    "fullName":joi.string().required()
};
  var user=req.body;
  
  if(user)
  {
    try
    {
    var validationResult=joi.validate(user,schema);
    if(validationResult.error){
        res.status(400).send("invalid data, please check your data again");
    }
    res.send(validationResult);
    }
    catch(e)
    {
        console.log(e); res.status(400).send("invalid user data");
    }
   
  }
  else {
      res.status(400). send("invalid/missing user data");
    }
  

});

router.put("/:userName",(req,res)=>{

    var user=users.find({userName:req.params.userName});
    var updatedUser=req.body;
    // validate
    // save the updated user to the database
} )
router.delete("/:userName",(req,res)=>{

    var user=users.find({userName:req.params.userName});
    
    
    // delete from the database the user with the user name in the request
} )
module.exports = router;
