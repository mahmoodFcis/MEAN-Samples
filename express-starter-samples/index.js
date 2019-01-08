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

mongoose.connect(config.get("databaseURL"))
    .then(() => {
        log.logToFile("connected to mongodb","info");
    }).
    catch(e => log.error(e));

    // this to test the global exception at uncaucht exception event emitter
    //throw new Error("An exception is throw at the index");

// here we log the env object of the process using Debug npm package
var server = app.listen(process.env.PORT || config.get("PORT") || 3000, () => {
    log.info(`is listening to port ${config.get("PORT")} `)
});
module.exports = server;
indexDebugger(process.env.PORT);
indexDebugger(app.get("env"));
indexDebugger(config.get("PORT"));