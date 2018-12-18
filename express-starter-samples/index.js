const express = require("express");
const config = require("config");
const indexDebugger = require("debug")("index");
const expressDebugger = require("debug")("myExpress");
const myMiddleware = require("./middleware/myMiddlware");
const mongoose = require("mongoose");
var app = express();
app.use(express.json());
//app.use(myMiddleware);
require("./config/routeConfig")(app);


/// initialize connection to the database

mongoose.connect(config.get("databaseURL"))
    .then(() => {
        indexDebugger("connected to mongodb");
    })
    .catch(e => indexDebugger("an error occurred during connection to mongo", e));

// here we log the env object of the process using Debug npm package
indexDebugger(process.env);
var server = app.listen(process.env.PORT || config.get("PORT") || 3000, () => {
    expressDebugger(`is listening to port ${config.get("PORT")} `)
});
module.exports = server;
indexDebugger(process.env.PORT);
indexDebugger(app.get("env"));
indexDebugger(config.get("PORT"));