var obrasModel = require("../models/obrasModel");

function obterQuadros(req, res) {
  var idMuseu = req.params.idMuseu;

  obrasModel.obterQuadros(idMuseu).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function obterStatusQuadro(req, res) {
    var idMuseu = req.params.idMuseu;
  var nomeQuadro = req.params.nomeQuadro;

  obrasModel.obterStatusQuadro(nomeQuadro,idMuseu).then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
    obterQuadros,
    obterStatusQuadro
};