const express=require("express");
const config=require("config");
const indexDebugger=require("debug")("index");
const expressDebugger=require("debug")("myExpress");
var app=express();
app.use(express.json());
require("./config/routeConfig")(app);
indexDebugger(process.env);
var server=app.listen(process.env.PORT|| config.get("PORT")|| 3000,()=>{expressDebugger(`is listening to port ${config.get("PORT")} `)});
module.exports=server;
indexDebugger(process.env.PORT);

indexDebugger(app.get("env"));

indexDebugger(config.get("PORT"));