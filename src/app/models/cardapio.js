const mongoose = require("../../database");

const CardapioSchema = new mongoose.Schema({
    nomeprato:{
        type: String,
        required: true,
    },
    valor:{
        type: String,
        required: false,

    },
    descricao:{
        type: String,
        required: false,
    },
    barraca:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barraca',
        require: true,

    },
    
    
});

const Cardapio = mongoose.model('Cardapio', CardapioSchema);
module.exports = Cardapio;