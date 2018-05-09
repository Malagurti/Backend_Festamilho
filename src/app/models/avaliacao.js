const mongoose = require("../../database");

const AvaliacaoSchema = new mongoose.Schema({
    barraca:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barraca',
    },
    data:{
        type: Date,
        default: Date.now
    },
    nota:{
        type: Number,
    }


 });

 const Avaliacao = mongoose.model('Avaliacao', AvaliacaoSchema);
 module.exports = Avaliacao;