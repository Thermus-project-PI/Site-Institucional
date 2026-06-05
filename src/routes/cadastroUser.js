var express = require("express");
var router = express.Router();

var cadastroUserController = require("../controllers/cadastroUserController");

router.post("/cadastrar", function (req, res) {
    cadastroUserController.cadastrar(req, res);
})

module.exports = router;