const mogoose = require("../database");

const AvaliacaoSchema = new mogoose.Schema({
    usuario:{
        type: String,
        required: true,
    },
    data:{
        type: Date,
        required: true,
    },
    nota:{
        type: Number,
        required: true,
    }


 });

 const Avaliacao = mongoose.model('Avaliacao', AvaliacaoSchema);
 module.exports = Avaliacao;