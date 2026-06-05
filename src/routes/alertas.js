var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

router.get("/buscarTotalAlertas/:id", function (req, res) {
    alertasController.buscarTotalAlertas(req, res);
});

router.get("/buscarAlertasAtencao/:id", function (req, res) {
    alertasController.buscarAlertasAtencao(req, res);
});

router.get("/buscarAlertasCriticos/:id", function(req, res){
    alertasController.buscarAlertasCriticos(req, res);
});

router.get("/buscarAlertasAtuais/:id", function(req, res){
    alertasController.buscarAlertasAtuais(req, res);
});

module.exports = router;
