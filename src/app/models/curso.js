const mongoose = require("../../database");

const CursoSchema = new mongoose.Schema({
 
    nome:{
        type: String,
        required: true,
    },
    semestre: {
        type: String,
        required: true,
    },
    periodo:{
        type: String,
        required:true,
    }
    
});

const Curso = mongoose.model('Curso', CursoSchema);
module.exports = Curso;