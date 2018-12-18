module.exports=function(roles)
{
    console.log(roles);
    return function(req,res,next){
        try
        {
            var userRoles=req.user.role;
            for(let i=0;i<userRoles.length;i++)
            {   
                if(roles.indexOf(userRoles[i])!=-1)
                {
                    next();
                }
            }
            res.status(403).send("Access is not permitted");
        }
        catch(e)
        {
            console.error(e);
            res.status(500).send("an error occurred");
        }
        
        
       
    }
   
    
}