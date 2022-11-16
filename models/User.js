const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
    nome: String,
    email: String, //colocar como único "unique"
    senha: String,
    compras: Array
});

module.exports = mongoose.model('Pessoa', usuariosSchema);