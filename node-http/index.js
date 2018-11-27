const http=require("http");
const url=require("url");
const fs=require("fs");

const events=require("events");
const eventEmmitter=new events.EventEmitter();

eventEmmitter.on("error",function(e){

    console.log("error is thrown");
})
// process.on("unhandledException",function(err){
//     console.log("an error occcured");
// });
http.createServer(function(req,res){

try
{
    res.writeHead(200);
    var requestedURL=url.parse(req.url,true);
 throw new Error("error occurred");
    fs.writeFile("mylog.txt",requestedURL,function(err){
        if(err)
        console.log(err);
    });
    res.end(requestedURL.query.name);
}
catch(e)
{
    eventEmmitter.emit("error",e);
    res.end();
}


}).listen(3030);

console.log("my http server is running");

