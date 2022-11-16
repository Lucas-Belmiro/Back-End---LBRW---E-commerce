const mongoose = require('mongoose');

const dadosDeEntregaSchema = new mongoose.Schema({
    cep: String,
    cidade: String,
    complemento: String,
    estado: String,
    numero: String,
    rua: String,
    pagamento: Object,
    produto: Array
});

module.exports = mongoose.model('Dados', dadosDeEntregaSchema);