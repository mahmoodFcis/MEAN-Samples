// print undefine variable
'use stric';
function throwError()
{
    try
    {
    
        console.log(x);
        return true;
        throw new Error();
      
        
    }
    
    catch(e)
    {
    
        console.log(e);
    }
    finally
    {
        
    }
    console.log("finally is reached");
    var x,y,z=2;
    
   
}


throwError();