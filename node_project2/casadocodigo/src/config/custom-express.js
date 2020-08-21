require("marko/node-require").install();
require("marko/express");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const sessaoAutenticacao = require("./sessao-autenticacao");
sessaoAutenticacao(app);

const tamplates = require("../app/views/tamplates");


app.use("/estatico", express.static("src/app/public"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

const rotas = require("../app/rotas/rotas");
rotas(app);

app.use(function (req, resp, next) {
  return resp.status(404).marko(tamplates.base.erro404);
});

app.use(function (erro, req, resp, next) {
  console.log(erro);
  return resp.status(500).marko(tamplates.base.erro500, { erro: erro.stack });
});

module.exports = app;