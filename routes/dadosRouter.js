const express = require('express');
const routerDados = express.Router();
const dadosController = require('../controllers/dadosController');

routerDados.post('/salvar', dadosController.saveData);
routerDados.get('/todos', dadosController.allData);


module.exports = routerDados;