const mongoose = require("../../database");

const BarracaSchema = new mongoose.Schema({

  
    nome:{
        type: String,
        required: true,
        unique: true,
    },

    curso:{
        type: String,
        required: true,
    },
    semestre:{
        type: String,
        required: true,
    },

    periodo:{
        type:String,
        required: true,
    },

    localizacao:{
        type: String,
        required: true,
    },

    cardapio:{
        type: String,
       
    },
    formapagamento:{
        type: String,
        required: true,
    },

});

const Barraca = mongoose.model('Barraca', BarracaSchema);
module.exports = Barraca;