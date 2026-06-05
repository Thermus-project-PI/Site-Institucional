var database = require("../database/config");

function temperaturaMedia() {
  var instrucaoSql = `select * from temperatura_media_vw`;
  return database.executar(instrucaoSql);
}

function umidadeMedia() {
  var instrucaoSql = `select * from umidade_media_vw`;
  return database.executar(instrucaoSql);
}

function pontoOrvalho() {
  var instrucaoSql = `select * from calculo_ponto_orvalho_vw`;
  return database.executar(instrucaoSql);
}

function alertas(idMuseu) {

  var instrucaoSql = `
    SELECT
      COUNT(
        CASE
          WHEN (temperatura - pontoOrvalho) <= 4
            OR umidade < 30
            OR umidade > 70
          THEN 1
        END
      ) AS total_criticos,

      COUNT(
        CASE
          WHEN (
            (temperatura - pontoOrvalho) > 4
            AND (temperatura - pontoOrvalho) <= 7
          )
          OR (
            umidade >= 30
            AND umidade < 40
          )
          OR (
            umidade > 60
            AND umidade <= 70
          )
          THEN 1
        END
      ) AS total_atencao,

      COUNT(
        CASE
          WHEN (temperatura - pontoOrvalho) <= 7
            OR umidade < 40
            OR umidade > 60
          THEN 1
        END
      ) AS total_alertas

    FROM status_leituras_vw
    WHERE museuId = ${idMuseu}
      AND DATE(dataHora) = CURDATE();
  `;

  return database.executar(instrucaoSql);
}
function graficoTemp() {
  var instrucaoSql = `select * from grafico_temperatura_vw;`;
  return database.executar(instrucaoSql);
}

function graficoUmidade() {
  var instrucaoSql = `select * from grafico_umidade_vw;`;
  return database.executar(instrucaoSql);
}

function ultimosAlertas(idMuseu) {

  var instrucaoSql = `
        SELECT
            s.quadroNome,
            l.temperatura,
            l.umidade,
            DATE_FORMAT(l.dataHora, '%H:%i') AS hora,
            CASE
                WHEN (l.temperatura - l.pontoOrvalho) <= 4
                     OR l.umidade < 30
                     OR l.umidade > 70
                    THEN 'CRÍTICO'

                WHEN (l.temperatura - l.pontoOrvalho) <= 7
                     OR l.umidade < 40
                     OR l.umidade > 60
                    THEN 'ATENÇÃO'

                ELSE 'OK'
            END AS status_atual

        FROM sensor s
        JOIN leitura l ON l.sensorId = s.id

        WHERE s.museuId = ${idMuseu}
          AND l.id = (
              SELECT MAX(id)
              FROM leitura
              WHERE sensorId = s.id
          );
    `;

  return database.executar(instrucaoSql);
}

module.exports = {
  temperaturaMedia,
  umidadeMedia,
  pontoOrvalho,
  alertas,
  graficoTemp,
  graficoUmidade,
  ultimosAlertas
};
