var database = require("../database/config");

function buscarTotalAlertas(id){
    console.log("ACESSEI O ALERTAS  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarTotalAlertas()");
    var instrucaoSql = `
        SELECT total_alertas
        FROM alertas_dashboard_vw WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertasAtencao(id){
    console.log("Acessei a função buscarAlertasAtencao em alertasModel");
    var instrucaoSql = `
    SELECT 
    COUNT(*) as alertas_atencao
    FROM status_sensores_vw
    WHERE status_atual = 'atencao'
    AND DATE(criadoEm) = CURDATE()
    AND id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertasCriticos(id){
    console.log("Acessei a função buscarAlertasCriticos em alertasModel");
    var instrucaoSql = `
    SELECT 
    COUNT(*) as alertas_criticos
    FROM status_sensores_vw
    WHERE status_atual = 'critico'
    AND DATE(criadoEm) = CURDATE()
    AND id = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
};


module.exports = {
    buscarTotalAlertas,
    buscarAlertasAtencao,
    buscarAlertasCriticos
}