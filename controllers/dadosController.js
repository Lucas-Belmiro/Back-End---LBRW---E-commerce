const Dados = require('../models/Dados')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const dadosController = {

    allData: async function (req, res) {
        try {
            let doc = await Dados.find({});
            res.send(doc);
        } catch (error) {
            res.send(error);
        }
    },

    saveData: async function (req, res) {

        let cep = req.body.cep;
        let cidade = req.body.cidade;
        let complemento = req.body.complemento;
        let estado = req.body.estado;
        let numero = req.body.numero;
        let rua = req.body.rua;
        let pagamento = req.body.pagamento;
        let produto = req.body.produto;

        let dados = new Dados({
            cep,
            cidade,
            complemento,
            estado,
            numero,
            rua,
            pagamento,
            produto
        })

        try {
            let doc = dados.save().then(doc => {
                return res.status(200).send({
                    message: "Dados enviados para o Back-End",
                    doc
                })
            });

        } catch (error) {
            res.status(500).send(error);
        }

    },


}

module.exports = dadosController;