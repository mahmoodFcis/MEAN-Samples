const promiseSample=require("./promiseSample");
const promiseSampleSync=require("./promiseWithSyncAwaitSyntax");
//calling using then() catch() function chain
//promiseSample();

//calling using async await syntax
async function execPromise()
{
    try
    {
    var res= await promiseSampleSync();
    console.log(res);
    }
    catch{

    }
    
}

execPromise();