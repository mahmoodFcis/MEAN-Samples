const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{

    res.status(400).send("this is from the products APIs");
})

router.post("/",(req,res)=>{
//handle validation

if(!validate(req.body)) res.status(400).send("your product object is not valid");

res.send([{"Name":"Ahmed"}]);

})

function validate(obj){
if(obj.UserName && obj.FullName)
return true;
else return false;
}
module.exports=router;