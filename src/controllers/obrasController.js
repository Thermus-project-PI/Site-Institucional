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

function obterMediaQuadro(req, res) {
  var idMuseu = req.params.idMuseu;
  var nomeQuadro = req.params.nomeQuadro;

  obrasModel.obterMediaQuadro(nomeQuadro,idMuseu).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function obterTotalAlerta(req, res) {
  var idMuseu = req.params.idMuseu;
  var nomeQuadro = req.params.nomeQuadro;

  obrasModel.obterTotalAlerta(nomeQuadro,idMuseu).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function obterGraficosObras(req, res) {
  var idMuseu = req.params.idMuseu;
  var nomeQuadro = req.params.nomeQuadro;

  obrasModel.obterGraficosObras(nomeQuadro,idMuseu).then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
    obterQuadros,
    obterStatusQuadro,
    obterMediaQuadro,
    obterTotalAlerta,
    obterGraficosObras
};