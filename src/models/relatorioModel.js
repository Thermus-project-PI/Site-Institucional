var database = require("../database/config");


function buscarRelatorioSemanal() {

    var instrucaoSql = `
        SELECT
            quadronome,
            dia_semana,
            temperatura_maxima,
            umidade_media,
            ponto_orvalho,
            status
        FROM relatorio_semanal_vw
        ORDER BY temperatura_maxima DESC
        LIMIT 3;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}



function buscarEstatisticasGerais() {

    var instrucaoSql = `
        SELECT
            temp_media,
            temp_maxima,
            umidade_media,
            ponto_orvalho_medio
        FROM estatisticas_gerais_vw;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}


function buscarSensorMaisAlertas() {

    var instrucaoSql = `
        SELECT
            quadronome,
            total_alertas
        FROM sensor_mais_alertas_vw
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}


function buscarOcorrenciasSensor() {

   var instrucaoSql = `
        SELECT
            quadronome,
            ocorrencias
        FROM ocorrencias_sensor_vw
        ORDER BY ocorrencias DESC
        LIMIT 4;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}


function buscarListaAlertas() {

    var instrucaoSql = `
        SELECT
            id,
            criadoem,
            quadronome,
            temperatura,
            umidade,
            pontoorvalho,
            diferenca,
            status_alerta
        FROM lista_alertas_vw
        ORDER BY criadoem DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}


function buscarResumoSensores() {

    var instrucaoSql = `
        SELECT
            sensor_id,
            quadronome,
            temp_media,
            umidade_media,
            ponto_orvalho,
            total_alertas
        FROM resumo_sensor_vw
        ORDER BY quadronome;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}


function buscarGraficoTemperatura() {

    var instrucaoSql = `
        SELECT
            hora,
            temperatura_media
        FROM grafico_temperatura_vw
        ORDER BY hora;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}


function buscarGraficoUmidade() {

    var instrucaoSql = `
        SELECT
            hora,
            umidade_media
        FROM grafico_umidade_vw
        ORDER BY hora;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}


module.exports = {
    buscarRelatorioSemanal,
    buscarEstatisticasGerais,
    buscarSensorMaisAlertas,
    buscarOcorrenciasSensor,
    buscarListaAlertas,
    buscarResumoSensores,
    buscarGraficoTemperatura,
    buscarGraficoUmidade
}