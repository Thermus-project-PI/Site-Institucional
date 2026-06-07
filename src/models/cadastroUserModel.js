var database = require("../database/config");

function cadastrar(nome, email, senha, cargo, museuId) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ");

    var instrucaoSql = `
        INSERT INTO funcionario (nome, email, senha, cargo, museuId) 
        VALUES ('${nome}', '${email}', '${senha}', '${cargo}', ${museuId});
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
};