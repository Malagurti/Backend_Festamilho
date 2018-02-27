const mongoose = require("../../database");

const BarracaSchema = new mongoose.Schema({

    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true,
    },
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

    cardapios:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cardapio',
        require: true,
    
    }],
    formapagamento: {
        type: String,
        required: true,
    },

});

const Barraca = mongoose.model('Barraca', BarracaSchema);
module.exports = Barraca;