var express = require("express");

var router = express.Router();

var relatorioController = require("../controllers/relatorioController");



router.get("/relatorio-semanal", function (req, res) {

    relatorioController.buscarRelatorioSemanal(req, res);

});

router.get("/estatisticas-gerais", function (req, res) {

    relatorioController.buscarEstatisticasGerais(req, res);

});

router.get("/sensor-mais-alertas", function (req, res) {

    relatorioController.buscarSensorMaisAlertas(req, res);

});

router.get("/ocorrencias-sensor", function (req, res) {

    relatorioController.buscarOcorrenciasSensor(req, res);

});

router.get("/lista-alertas", function (req, res) {

    relatorioController.buscarListaAlertas(req, res);

});


router.get("/resumo-sensores", function (req, res) {

    relatorioController.buscarResumoSensores(req, res);

});


router.get("/grafico-temperatura", function (req, res) {

    relatorioController.buscarGraficoTemperatura(req, res);

});

router.get("/grafico-umidade", function (req, res) {

    relatorioController.buscarGraficoUmidade(req, res);

});


module.exports = router;