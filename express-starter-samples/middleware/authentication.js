const jwt=require("jsonwebtoken");
const config=require("config");
module.exports=function(req,res,next)
{
    if(req.url=="" && req.user.role)
    if(req.header("X-Auth-Token"))
    {
        var token=req.header("X-Auth-Token");
        try
        {
            var user=jwt.verify(token,config.get("JWT_PrivateKey"));
            req.user=user;
            next();
        }  
        catch(e)
        {
         res.status(410).send("User information/token are invalid");
        }

    }
    else
    {
        res.status(401).send("Access is denied");
    }
}