const express = require("express");
const os = require("node:os");
const process = require("node:process");
const banco_mysql = require("mysql2");

const app = express();

app.get("/", (request, response) => {
  return response.status(200).json({
    message: "Olá, você está na raiz da aplicação",
  });
});

app.get("/liveness", (request, response) => {
  return response.status(200).json({
    message: "Meu App está Vivo!",
    path: process.cwd(),
    date: new Date().getTime(),
    //gid: process.getegid(),
    //uid: process.geteuid()
  });
});

app.get("/readiness", (request, response) => {
  //Serve para testar se o banco está rodando por exemplo
  return response.status(200).json({
    message: "Meu app está pronto!",
    platform: os.platform(),
    freemem: os.freemem(),
    homedir: os.homedir(),
    date: new Date().getTime(),
  });
});

app.get("/consulta-dados", (request, response) => {
  const conexao = banco_mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "projetofullstack",
  });

  const query = `select * from quarto`;

  conexao.query(query, (erro, listaQuartos) => {
    if (erro) {
        response.status(500).json({
        erro: "Ocorreu um erro ao tentar listar os quartos! Verifique o arquivo LEIAME.",
      });
    } else {
        return response.status(200).json({
            message: "Tabela de quartos de um Hotel",
            listaQuartos
          });          
    }
  });

});

module.exports = app;
