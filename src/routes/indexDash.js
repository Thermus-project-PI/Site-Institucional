var express = require("express");
var router = express.Router();

var indexDashController = require("../controllers/indexDashController"); 

router.get("/temperaturaMedia/:idUsuario", function (req, res) {
  indexDashController.buscarTemperaturaMedia(req, res);
});

router.get("/umidadeMedia/:idUsuario", function (req, res) {
  indexDashController.buscarUmidadeMedia(req, res);
});

router.get("/pontoOrvalho/:idUsuario", function (req, res) {
  indexDashController.buscarPontoOrvalho(req, res);
});

router.get("/alertas/:idUsuario", function (req, res) {
  indexDashController.buscarAlertas(req, res);
});

router.get("/graficoTemp/:idUsuario", function (req, res) {
  indexDashController.buscarGraficoTemp(req, res);
});

router.get("/graficoumidade/:idUsuario", function (req, res) {
  indexDashController.buscarGraficoUmidade(req, res);
});

router.get("/ultimosAlertas/:idUsuario", function (req, res) {
  indexDashController.buscarGraficoUmidade(req, res);
});


module.exports = router;
