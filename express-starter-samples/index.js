const express = require("express");
const config = require("config");
const indexDebugger = require("debug")("index");
const expressDebugger = require("debug")("myExpress");
const myMiddleware = require("./middleware/myMiddlware");
const compression=require("compression");
const helmet=require("helmet");
const mongoose = require("mongoose");
var app = express();
app.use(compression());
app.use(helmet());
app.use(express.json());
//app.use(myMiddleware);
require("./config/routeConfig")(app);
const log=require("./log");
process.on("uncaughtException",function(e){

   log.error("error handled globally on the process as a whole "+e);
});

process.on("unhandledRejection",function(e){

    log.error("error handled globally on the process as a whole "+e);
})

/// initialize connection to the database
console.log(config.get("databaseURL"));
mongoose.connect(config.get("databaseURL"),{auth:{user:config.get("dbUserName"),password:config.get("dbPassword")}})
    .then(() => {
        log.logToFile("connected to mongodb","info");
        console.log("connected to mongodb")
    }).
    catch(e => log.error(e));
console.error(e);
    

// here we log the env object of the process using Debug npm package
var server = app.listen(process.env.PORT || config.get("PORT") || 3000, () => {
    log.info(`is listening to port ${config.get("PORT")} `)
});
module.exports = server;
indexDebugger(process.env.PORT);
indexDebugger(app.get("env"));
indexDebugger(config.get("PORT"));