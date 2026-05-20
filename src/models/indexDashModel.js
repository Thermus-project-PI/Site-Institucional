var database = require("../database/config");

function temperaturaMedia(id) {
  var instrucaoSql = `select * from temperatura_media_vw`;
  return database.executar(instrucaoSql);
}

function umidadeMedia(id) {
  var instrucaoSql = `select * from umidade_media_vw`;
  return database.executar(instrucaoSql);
}

function pontoOrvalho(id) {
  var instrucaoSql = `select * from calculo_ponto_orvalho_vw`;
  return database.executar(instrucaoSql);
}

function alertas(id) {
  var instrucaoSql = `select * from alertas_dashboard_vw;`;
  return database.executar(instrucaoSql);
}


module.exports = {
  temperaturaMedia,
  umidadeMedia,
  pontoOrvalho,
  alertas
  
};
