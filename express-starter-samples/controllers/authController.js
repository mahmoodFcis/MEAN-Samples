const {getByUserName} =require("../models/user");
module.exports={
    login:async (req,res)=>
    {
      if(req.body.userName &&req.body.password)
      {
          var userRequest=req.body;
          var user=await getByUserName(req.body.userName);
          if(user)
          {
              var isValidPassword=await user.validatePassword(userRequest.password);
              if(isValidPassword===true)
              {
                  var token=user.generateAuthToken();
    
                  res.header("X-Auth-Token",token).send(userRequest);
              }
              else res.status(404).send("User name or password are incorrect");
          }
          else res.status(404).send("User name or password are incorrect");
    
      }
      else
      {
          res.status(401).send("invalid user name or  password")
      }
    
    }
}