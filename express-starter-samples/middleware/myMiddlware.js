module.exports=function(req,res,next)
{
    if(req.body.userName)
    {
        next();
    }
    else res.status(404).send("user name does not exist");
}