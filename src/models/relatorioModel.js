var database = require("../database/config");





function buscarRelatorioSemanal() {



    var instrucaoSql = ` 
       SELECT
    dia,
    CASE dia_numero
        WHEN 0 THEN 'Segunda'
        WHEN 1 THEN 'Terça'
        WHEN 2 THEN 'Quarta'
        WHEN 3 THEN 'Quinta'
        WHEN 4 THEN 'Sexta'
        WHEN 5 THEN 'Sábado'
        WHEN 6 THEN 'Domingo'
    END AS dia_semana,
    total_alertas,
    CASE
        WHEN media_status >= 2.5 THEN 'critico'
        WHEN media_status >= 1.5 THEN 'atencao'
        ELSE 'ok'
    END AS status_medio
FROM (
    SELECT
        DATE(dataHora) AS dia,
        WEEKDAY(dataHora) AS dia_numero,
        COUNT(*) AS total_alertas,
        avg(
            case status_atual
                when 'ok' then 1
                when 'atencao' then 2
                when 'critico' then 3
            end
        ) as media_status
    FROM status_leituras_vw
    GROUP BY
        DATE(dataHora),
        WEEKDAY(dataHora)
) AS resultado
ORDER BY dia;
    `;



    console.log("Executando a instrução SQL: \n" + instrucaoSql);



    return database.executar(instrucaoSql);

}







function buscarEstatisticasGerais() {



    var instrucaoSql = ` 

            SELECT 
    ROUND(AVG(temperatura),1) AS temp_media,
    MAX(temperatura) AS temp_maxima,
    ROUND(AVG(umidade),1) AS umidade_media,
    ROUND(AVG(pontoOrvalho),1) AS ponto_orvalho_medio
FROM leitura;

    `;



    console.log("Executando a instrução SQL: \n" + instrucaoSql);



    return database.executar(instrucaoSql);

}





function buscarSensorMaisAlertas() {



    var instrucaoSql = ` 

    
SELECT 
    s.quadroNome as quadronome,
    SUM(
        CASE 
            WHEN (l.temperatura - l.pontoOrvalho) <= 7 OR l.umidade < 30 OR l.umidade > 70 THEN 1 
            ELSE 0 
        END
    ) AS total_alertas

FROM sensor s
JOIN leitura l ON l.sensorId = s.id
GROUP BY s.id, s.quadroNome
ORDER BY total_alertas DESC
LIMIT 1;

    `;



    console.log("Executando a instrução SQL: \n" + instrucaoSql);



    return database.executar(instrucaoSql);

}





function buscarOcorrenciasSensor() {



    var instrucaoSql = ` 

                SELECT 
    s.quadroNome AS quadronome,

    SUM(
        CASE 
            WHEN (l.temperatura - l.pontoOrvalho) <= 7  OR l.umidade < 30 OR l.umidade > 70  tHEN 1
            ELSE 0 
        END
    ) AS ocorrencias

FROM sensor s
JOIN leitura l ON l.sensorId = s.id
GROUP BY s.id, s.quadroNome
ORDER BY ocorrencias DESC
LIMIT 5; 

    `;



    console.log("Executando a instrução SQL: \n" + instrucaoSql);



    return database.executar(instrucaoSql);

}





function buscarListaAlertas() {



    var instrucaoSql = ` 

                SELECT 
    l.id,
    l.dataHora,
    s.quadroNome AS quadronome,
    l.temperatura,
    l.umidade,
    l.pontoOrvalho,

    (l.temperatura - l.pontoOrvalho) AS diferenca,

    CASE 
        WHEN (l.temperatura - l.pontoOrvalho) <= 4 THEN 'critico'
        WHEN (l.temperatura - l.pontoOrvalho) <= 7 THEN 'atencao'
        ELSE 'ok'
    END AS status_alerta

FROM leitura l
JOIN sensor s ON s.id = l.sensorId
ORDER BY l.dataHora DESC; 

    `;



    console.log("Executando a instrução SQL: \n" + instrucaoSql);



    return database.executar(instrucaoSql);

}





function buscarResumoSensores() {



    var instrucaoSql = ` 

               SELECT 
    s.id AS sensor_id,
    s.quadroNome AS quadronome,

    ROUND(AVG(l.temperatura),1) AS temp_media,
    ROUND(AVG(l.umidade),1) AS umidade_media,
    ROUND(AVG(l.pontoOrvalho),1) AS ponto_orvalho,

    SUM(
        CASE 
            WHEN (l.temperatura - l.pontoOrvalho) <= 7 THEN 1 
            ELSE 0 
        END
    ) AS total_alertas

FROM sensor s
LEFT JOIN leitura l ON l.sensorId = s.id
GROUP BY s.id, s.quadroNome
ORDER BY s.quadroNome; 

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



