const relatorioModel = require("../models/relatorioModel")



function buscarRelatorioSemanal(req, res) {

    relatorioModel.buscarRelatorioSemanal()
        .then(function (resultado) {

            res.status(200).json(resultado);

        }).catch(function (erro) {

            console.log(erro);

            console.log(
                "\nHouve um erro ao buscar o relatório semanal! Erro: ",
                erro.sqlMessage
            );

            res.status(500).json(erro.sqlMessage);
        });
}


function buscarEstatisticasGerais(req, res) {

    relatorioModel.buscarEstatisticasGerais()
        .then(function (resultado) {

            res.status(200).json(resultado);

        }).catch(function (erro) {

            console.log(erro);

            console.log(
                "\nHouve um erro ao buscar as estatísticas gerais! Erro: ",
                erro.sqlMessage
            );

            res.status(500).json(erro.sqlMessage);
        });
}


function buscarSensorMaisAlertas(req, res) {

    relatorioModel.buscarSensorMaisAlertas()
        .then(function (resultado) {

            res.status(200).json(resultado);

        }).catch(function (erro) {

            console.log(erro);

            console.log(
                "\nHouve um erro ao buscar o sensor com mais alertas! Erro: ",
                erro.sqlMessage
            );

            res.status(500).json(erro.sqlMessage);
        });
}


function buscarOcorrenciasSensor(req, res) {

    relatorioModel.buscarOcorrenciasSensor()
        .then(function (resultado) {

            res.status(200).json(resultado);

        }).catch(function (erro) {

            console.log(erro);

            console.log(
                "\nHouve um erro ao buscar as ocorrências dos sensores! Erro: ",
                erro.sqlMessage
            );

            res.status(500).json(erro.sqlMessage);
        });
}


function buscarListaAlertas(req, res) {

    relatorioModel.buscarListaAlertas()
        .then(function (resultado) {

            res.status(200).json(resultado);

        }).catch(function (erro) {

            console.log(erro);

            console.log(
                "\nHouve um erro ao buscar a lista de alertas! Erro: ",
                erro.sqlMessage
            );

            res.status(500).json(erro.sqlMessage);
        });
}


function buscarResumoSensores(req, res) {

    relatorioModel.buscarResumoSensores()
        .then(function (resultado) {

            res.status(200).json(resultado);

        }).catch(function (erro) {

            console.log(erro);

            console.log(
                "\nHouve um erro ao buscar o resumo dos sensores! Erro: ",
                erro.sqlMessage
            );

            res.status(500).json(erro.sqlMessage);
        });
}


function buscarGraficoTemperatura(req, res) {

    relatorioModel.buscarGraficoTemperatura()
        .then(function (resultado) {

            res.status(200).json(resultado);

        }).catch(function (erro) {

            console.log(erro);

            console.log(
                "\nHouve um erro ao buscar os dados do gráfico de temperatura! Erro: ",
                erro.sqlMessage
            );

            res.status(500).json(erro.sqlMessage);
        });
}


function buscarGraficoUmidade(req, res) {

    relatorioModel.buscarGraficoUmidade()
        .then(function (resultado) {

            res.status(200).json(resultado);

        }).catch(function (erro) {

            console.log(erro);

            console.log(
                "\nHouve um erro ao buscar os dados do gráfico de umidade! Erro: ",
                erro.sqlMessage
            );

            res.status(500).json(erro.sqlMessage);
        });
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