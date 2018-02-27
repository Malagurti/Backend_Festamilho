const mongoose = require("../../database");

const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
 
    nome:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },

    nivel:{
        type: Number,
        select: false,
        require: true,
        default: '1',
    },
    senha:{
        type: String,
        required: true,
        select: false,
    },
    senhaResetToken:{
        type: String,
        select: false,
    },
    senhaResetExpires:{
        type: Date,
        select: false,
    },

    dataCreate:{
        type: Date,
        default: Date.now,

    },

});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});
const Usuario = mongoose.model('Usuario', UserSchema);

module.exports = Usuario;