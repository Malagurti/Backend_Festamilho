const mongoose = require("../../database");

const CardapioSchema = new mangoose.Schema({
    nomeprato:{
        type: String,
        required: true,
    },
    valor:{
        type: Number,
        required: false,

    },
    descricao:{
        type: String,
        required: false,
    },
    barraca:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barraca,

    },
    
    
});

const Cardapio = mongoose.model('Carcapio', CardapioSchema);
module.exports = Cardapio;