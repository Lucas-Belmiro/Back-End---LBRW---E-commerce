const Pessoa = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {

    allUsers: async function (req, res) {
        try {
            let doc = await Pessoa.find({});
            res.status(200).json(doc)
        } catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    },

    findUser: async function (req, res) {

        let id = req.params._id;

        try {

            res.status(200).send(await Pessoa.findById(id));

        } catch (error) {
            res.status(500).send(error);
        }

    },

    saveUser: async function (req, res) {

        let nome = req.body.nome;
        let email = req.body.email;
        let senha = bcrypt.hashSync(req.body.senha);

        let pessoa = new Pessoa({
            nome,
            email,
            senha
        })

        try {
            let doc = pessoa.save().then(doc => {
                return res.status(200).send({
                    message: "Usuario cadastrado!",
                })
            });

        } catch (error) {
            res.status(500).send(error);
        }

    },

    login: async function (req, res) {

        try {

            Pessoa.findOne({
                email: req.body.email
            }, {
                email: 1,
                senha: 1,
                nome: 1
            }, (error, user) => {

                if (!user) {
                    return res.status(401).send({
                        message: "Usuario ou senha não encontrados",
                    })
                }

                if (!(bcrypt.compareSync(req.body.senha, user.senha))) {

                    return res.status(401).send({
                        message: "Usuario ou senha não encontrados",

                    })
                }

                const token = jwt.sign({
                    _id: user._id
                }, process.env.TOKEN_Secret, {
                    expiresIn: 3600
                });

                res.header('authorization-token', token);

                return res.status(200).send({
                    message: "Usuario logado com sucesso",
                    token
                })

            })

        } catch (error) {
            return res.sendStatus(500).send({
                message: error.message || "some error occured"
            })
        }
    },

    updateUser: async function (req, res) {

        const findUser = await Pessoa.findById(req.params._id)

        try {

            if (findUser) {
                findUser.nome = req.body.nome || findUser.nome
                findUser.email = req.body.email || findUser.email
                findUser.senha = req.body.senha || findUser.senha
                findUser.compras = req.body.compras || findUser.compras
            }

            const savedUser = await findUser.save()

            res.status(200).json({
                message: "Usuário atualizado com sucesso!",
                savedUser
            })
        } catch (error) {
            return res.sendStatus(500).send({
                message: error.message || "some error occured"
            })
        }

    },

    deleteUser: async function (req, res) {

        let id = req.params._id;

        try {
            const userFound = await Pessoa.findByIdAndDelete(id);

            res.status(200).json({
                mensagem: `Usuário '${userFound.email}' deletada com sucesso!`
            })

        } catch (error) {
            res.status(400).json({
                mensagem: err.message
            })
        }

    },

    verifyToken: async function (req, res) {

        try {

            let token = req.body.tokenExistente;

            const userVerify = jwt.verify(token, process.env.TOKEN_Secret);
            if (userVerify) {

                res.status(200).json({
                    message: "Usuário validado com sucesso!",
                    userVerify
                })

            } else {
                res.status(400).json({
                    message: "Token Invalido"
                })
            }

        } catch (error) {
            res.status(400).json(error);
        }

    },

    IdPurchases: async function (req, res) {


        let _id = req.body.idUser;

        try {

            const id = await Pessoa.findById(_id);
            const data = {
                message: "Requisição válida",
                compras: id.compras
            }
            res.status(200).json(
                data
            )

        } catch (error) {
            res.status(500).send(error);
        }

    },


}

module.exports = userController;