var express = require("express");
var router = express.Router();

var obrasController = require("../controllers/obrasController");

router.get("/obterQuadros/:idMuseu", function (req, res) {
    obrasController.obterQuadros(req, res);
});

router.get("/obterStatusQuadro/:idMuseu/:nomeQuadro", function (req, res) {
    obrasController.obterStatusQuadro(req, res);
});


module.exports = router;