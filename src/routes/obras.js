var express = require("express");
var router = express.Router();

var obrasController = require("../controllers/obrasController");

router.get("/obterQuadros/:idMuseu", function (req, res) {
    obrasController.obterQuadros(req, res);
});

router.get("/obterStatusQuadro/:idMuseu/:nomeQuadro", function (req, res) {
    obrasController.obterStatusQuadro(req, res);
});

router.get("/obterMediaQuadro/:idMuseu/:nomeQuadro", function (req, res) {
    obrasController.obterMediaQuadro(req, res);
});

router.get("/obterTotalAlerta/:idMuseu/:nomeQuadro", function (req, res) {
    obrasController.obterTotalAlerta(req, res);
});

router.get("/obterGraficosObras/:idMuseu/:nomeQuadro", function (req, res) {
    obrasController.obterGraficosObras(req, res);
});


module.exports = router;