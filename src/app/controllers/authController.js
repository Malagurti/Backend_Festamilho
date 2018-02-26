const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');
const Usuario = require('../../app/models/Usuario');
const router = express.Router();



function tokengen(params = {}){
   return jwt.sign( params, authConfig.secret, {
        expiresIn: 40000,
   });
};

router.post('/registro', async (req, res)=> {
    const { email } = req.body;

    try {
        
        if (await Usuario.findOne({ email }))
            return res.status(400).send({error: 'Usuario ja Cadastrado'});

        const usuario = await Usuario.create(req.body);

        usuario.senha = undefined;

        return res.send({ 
            usuario,
            token: tokengen({ id: usuario.id}), 
        });
    }
    catch (err) {
        return res.status(400).send({error: 'Falha de Cadastro'})
    }
});

router.post('/autenticacao', async (req, res)=> {
    const { email, senha} = req.body;

    const usuario = await Usuario.findOne({ email }).select('+senha');

    if (!usuario)
        return res.status(400).send({error: 'Usuario inexistente'});

    if(!await bcrypt.compare(senha, usuario.senha))
        return res.status(400).send({error: 'Senha Incorreta'});

    usuario.senha = undefined;

    const token = jwt.sign( {id: usuario.id}, authConfig.secret, {
        expiresIn: 40000,
    }); 

    res.send ({ 
        usuario, 
        token: tokengen({ id: usuario.id }),
     });
});

module.exports = app => app.use('/auth', router);