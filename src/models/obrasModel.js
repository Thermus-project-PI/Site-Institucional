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
    WHERE museuId = ${idMuseu} 
    AND quadroNome = '${nomeQuadro}');`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterMediaQuadro(nomeQuadro,idMuseu) {

    var instrucaoSql = `
    SELECT ROUND(AVG(temperatura),1) AS temperaturaMedia, 
    ROUND(AVG(umidade),0) AS umidadeMedia 
    FROM status_leituras_vw 
    WHERE museuId = ${idMuseu} 
    AND quadroNome = '${nomeQuadro}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterTotalAlerta(nomeQuadro,idMuseu) {

    var instrucaoSql = `
    SELECT COUNT(*) AS total_alertas
    FROM status_leituras_vw 
    WHERE museuId = ${idMuseu} 
    AND quadroNome = '${nomeQuadro}' 
    AND status_atual <> 'OK';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterGraficosObras(nomeQuadro,idMuseu) {

    var instrucaoSql = `
    SELECT
        quadroNome,
        HOUR(dataHora) AS hora,
        ROUND(AVG(temperatura),1) AS temperatura,
        ROUND(AVG(umidade),0) AS umidade
    FROM status_leituras_vw
    WHERE museuId = ${idMuseu}
    AND quadroNome = '${nomeQuadro}'
    AND dataHora >= CURDATE()
    GROUP BY quadroNome, HOUR(dataHora)
    ORDER BY hora;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    obterQuadros,
    obterStatusQuadro,
    obterMediaQuadro,
    obterTotalAlerta,
    obterGraficosObras
}