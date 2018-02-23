const mongoose = require("../database");

const BarracaSchema = new mongoose.Schema({

  
      nome:{
        type: String,
        required: true,
    },

    curso:{
        type: String,
        required: true,
    },

    localizacao:{
        type: String,
        required: true,
    },

    cardapio:{
        type: String,
        required: false,
    },
    formapagamento:{
        type: String,
        required: true,
    },

});

const Barraca = new mongoose.model('Barraca', BarracaSchema);
module.exports = Barraca;