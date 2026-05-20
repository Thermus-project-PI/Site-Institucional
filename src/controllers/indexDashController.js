var indexDashModel = require("../models/indexDashModel"); 

function buscarTemperaturaMedia(req, res) {
  var idUsuario = req.params.idUsuario;

  indexDashModel.temperaturaMedia(idUsuario)
        .then(function(resultado){
            res.json(resultado);
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarUmidadeMedia(req, res) {
  var idUsuario = req.params.idUsuario;

  indexDashModel.umidadeMedia(idUsuario)
        .then(function(resultado){
            res.json(resultado);
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarPontoOrvalho(req, res) {
  var idUsuario = req.params.idUsuario;

  indexDashModel.pontoOrvalho(idUsuario)
        .then(function(resultado){
            res.json(resultado);
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarAlertas(req, res) {
  var idUsuario = req.params.idUsuario;

  indexDashModel.alertas(idUsuario)
        .then(function(resultado){
            res.json(resultado);
        })
        .catch(function(erro){
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
  buscarTemperaturaMedia,
  buscarUmidadeMedia,
  buscarPontoOrvalho,
  buscarAlertas
};
