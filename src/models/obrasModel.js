var database = require("../database/config");

function obterQuadros(idMuseu) {

    var instrucaoSql = `
    SELECT quadroNome 
    FROM sensor 
    WHERE museuId = ${idMuseu};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterStatusQuadro(nomeQuadro,idMuseu) {

    var instrucaoSql = `
    SELECT * FROM status_leituras_vw WHERE idLeitura = (
    SELECT MAX(idLeitura) FROM status_leituras_vw 
    WHERE id = ${idMuseu} 
    AND quadroNome = '${nomeQuadro}');`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    obterQuadros,
    obterStatusQuadro
}
