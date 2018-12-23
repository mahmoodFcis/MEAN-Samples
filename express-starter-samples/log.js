const fs=require("fs");
const config=require("config");
const winston=require("winston");
require("winston-mongodb");

require("pino-pretty");
const pino=require("pino")({prettyPrint: true});
winston.add(new winston.transports.Console());
winston.add(new winston.transports.File({filename:config.get("winstonPath"),level:"error"}));
winston.add(new winston.transports.MongoDB({db:config.get("winstonDB"),level:"error"}));
winston.error("an error occurred");

winston.info("this is a logging from winston");

module.exports = {
    error: (e) => {

        console.error("an error occurred with details " + e);

    },
    info: (msg) => {
       pino.info("this is from pino logging "+ msg);pino.error("an error in pino example");
    },
    warrning: (msg) => {
        console.warn(msg);
    },
    logToFile:(msg,logType)=>
    {
       msg=logType+" "+msg;

        fs.appendFile(config.get("logFilePath"),msg,function(err){
         console.error(err);
         
        })
    }
}