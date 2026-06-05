var database = require("../database/config"); 

 

 

function buscarRelatorioSemanal() { 

 

    var instrucaoSql = ` 

        SELECT 

    WEEKDAY(l.dataHora) AS dia_numero, 

    CASE WEEKDAY(l.dataHora) 

        WHEN 0 THEN 'Segunda' 

        WHEN 1 THEN 'Terça' 

        WHEN 2 THEN 'Quarta' 

        WHEN 3 THEN 'Quinta' 

        WHEN 4 THEN 'Sexta' 

        WHEN 5 THEN 'Sábado' 

        WHEN 6 THEN 'Domingo' 

    END AS dia_semana, 

    COUNT(a.id) AS total_alertas, 

    CASE 

    WHEN SUM(CASE WHEN a.tipoAlerta = 'CRÍTICO' THEN 1 ELSE 0 END) > 0 

        THEN 'crítico' 

    WHEN SUM(CASE WHEN a.tipoAlerta = 'ATENÇÃO' THEN 1 ELSE 0 END) > 0 

        THEN 'atenção' 

    ELSE 'ok' 

END AS status 

FROM leitura l 

LEFT JOIN alerta a 

    ON a.leituraId = l.id 

WHERE l.dataHora >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) 

GROUP BY WEEKDAY(l.dataHora), 

    CASE WEEKDAY(l.dataHora) 

        WHEN 0 THEN 'Segunda' 

        WHEN 1 THEN 'Terça' 

        WHEN 2 THEN 'Quarta' 

        WHEN 3 THEN 'Quinta' 

        WHEN 4 THEN 'Sexta' 

        WHEN 5 THEN 'Sábado' 

        WHEN 6 THEN 'Domingo' 

    END 

ORDER BY dia_numero; 

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

    s.quadroNome AS quadronome, 

            COUNT(a.id) AS total_alertas 

        FROM sensor s 

        JOIN leitura l 

            ON l.sensorId = s.id 

        JOIN alerta a 

            ON a.leituraId = l.id 

        GROUP BY s.id 

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

            COUNT(a.id) AS ocorrencias 

        FROM sensor s 

        JOIN leitura l 

            ON l.sensorId = s.id 

        LEFT JOIN alerta a 

            ON a.leituraId = l.id 

        GROUP BY s.id 

        ORDER BY ocorrencias DESC 

        LIMIT 5; 

    `; 

 

    console.log("Executando a instrução SQL: \n" + instrucaoSql); 

 

    return database.executar(instrucaoSql); 

} 

 

 

function buscarListaAlertas() { 

 

    var instrucaoSql = ` 

                SELECT 

            a.id, 

            a.criadoEm, 

            s.quadroNome AS quadronome, 

            l.temperatura, 

            l.umidade, 

            l.pontoOrvalho, 

            (l.temperatura - l.pontoOrvalho) AS diferenca, 

            a.tipoAlerta AS status_alerta 

        FROM alerta a 

        JOIN leitura l 

            ON l.id = a.leituraId 

        JOIN sensor s 

            ON s.id = l.sensorId 

        ORDER BY a.criadoEm DESC; 

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

            COUNT(a.id) AS total_alertas 

        FROM sensor s 

        LEFT JOIN leitura l 

            ON l.sensorId = s.id 

        LEFT JOIN alerta a 

            ON a.leituraId = l.id 

        GROUP BY s.id 

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

 

 