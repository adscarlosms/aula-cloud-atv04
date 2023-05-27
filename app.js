const express = require("express");
const os = require("node:os");
const process = require("node:process");
const app = express();

app.get("/", (request,response) => {
    return response
        .status(200)
        .json({
            message: "Olá",
        });
});

app.get("/liveness", (request,response) => {
    return response
        .status(200)
        .json({
            message: "Meu App está Vivo!",
            path: process.cwd(),
            date: new Date().getTime()
            //gid: process.getegid(),
            //uid: process.geteuid()
        });
});

app.get("/readiness", (request,response) => {
    //Serve para testar se o banco está rodando por exemplo
    return response
        .status(200)
        .json({
            message: "Meu app está pronto!",
            platform: os.platform(),
            freemem: os.freemem(),
            homedir: os.homedir(),
            date: new Date().getTime()
        });
});

module.exports = app;