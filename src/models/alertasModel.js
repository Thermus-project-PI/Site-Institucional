var database = require("../database/config");

function buscarTotalAlertas(id){
    console.log("ACESSEI O ALERTAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarTotalAlertas()");
    var instrucaoSql = `
        SELECT COUNT(*) as total_alertas
        FROM status_leituras_vw 
        WHERE status_atual <> 'ok' 
        AND id = ${id}
        AND DATE(dataHora) = curdate();
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertasAtencao(id){
    console.log("Acessei a função buscarAlertasAtencao em alertasModel");
    var instrucaoSql = `
    SELECT COUNT(*) as alertas_atencao
    FROM status_leituras_vw 
    WHERE status_atual = 'atencao' 
    AND id = ${id}
    AND DATE(dataHora) = curdate();
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertasCriticos(id){
    console.log("Acessei a função buscarAlertasCriticos em alertasModel");
    var instrucaoSql = `
    SELECT COUNT(*) as alertas_criticos
    FROM status_leituras_vw 
    WHERE status_atual = 'critico' 
    AND id = ${id}
    AND DATE(dataHora) = curdate();
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};


function buscarAlertasAtuais(id){
    console.log("Acessei a função buscarAlertasCriticos em alertasModel");
    var instrucaoSql = `
    SELECT 
    DATE_FORMAT(dataHora, '%d/%m %H:%i') AS dataHora,
    quadroNome,
    temperatura,
    umidade,
    pontoOrvalho,
    diferenca,
    status_atual
    FROM status_leituras_vw
    WHERE DATE(dataHora) = CURDATE()
    AND status_atual != 'ok'
    AND id = ${id}
    ORDER BY dataHora DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};

module.exports = {
    buscarTotalAlertas,
    buscarAlertasAtencao,
    buscarAlertasCriticos,
    buscarAlertasAtuais
}