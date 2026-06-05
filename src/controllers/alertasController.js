var alertasModel = require("../models/alertasModel");

function buscarTotalAlertas(req, res) {

    var id = req.params.id;
    console.log("valor recebido:" + id)

    if (id == undefined) {

        res.status(400).send("O id do usuário está undefined!");

    } else {

        alertasModel.buscarTotalAlertas(id)
            .then(function(resultado) {

                res.json(resultado);

            }).catch(function(erro) {

                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar o total de alertas! Erro: ",
                    erro.sqlMessage
                );

                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarAlertasAtencao(req, res){
    var id = req.params.id;
    
    if(id == undefined){
        res.status(400).send("O id do usuário está undefined!");
    }
    else{

        alertasModel.buscarAlertasAtencao(id)
            .then(function(resultado){

                res.json(resultado);
            }).catch(function(erro){
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar o total de alertas! Erro: ",
                    erro.sqlMessage
                );

                res.status(500).json(erro.sqlMessage);

            })
    }
}

function buscarAlertasCriticos(req, res){
    var id = req.params.id;
    
    if(id == undefined){
        res.status(400).send("O id do usuário está undefined!");
    }
    else{

        alertasModel.buscarAlertasCriticos(id)
            .then(function(resultado){

                res.json(resultado);
            }).catch(function(erro){
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar o total de alertas! Erro: ",
                    erro.sqlMessage
                );

                res.status(500).json(erro.sqlMessage);

            })
    }
}

function buscarAlertasAtuais(req, res){
    var id = req.params.id;
    
    if(id == undefined){
        res.status(400).send("O id do usuário está undefined!");
    }
    else{

        alertasModel.buscarAlertasCriticos(id)
            .then(function(resultado){

                res.json(resultado);
            }).catch(function(erro){
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar o total de alertas! Erro: ",
                    erro.sqlMessage
                );

                res.status(500).json(erro.sqlMessage);

            })
    }
}

module.exports = {
    buscarTotalAlertas,
    buscarAlertasAtencao,
    buscarAlertasCriticos,
    buscarAlertasAtuais
}