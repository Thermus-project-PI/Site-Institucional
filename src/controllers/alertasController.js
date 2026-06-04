var alertasModel = require("../models/alertasModel");

function buscarTotalAlertas(req, res) {

    var id = req.params.id;

    if (id == undefined) {

        res.status(400).send("O id do usuário está undefined!");

    } else {

        alertasModel.buscarTotalAlertas(id_usuario)
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

module.exports = {
    buscarTotalAlertas
}