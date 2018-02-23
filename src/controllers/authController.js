const express = require('express');

const User = require('../models/User');

const Barraca = require('../models/Barraca')

const router = express.Router();

router.post('/registro/usuario', async (req, res)=> {
    const { email } = req.body;

    try {
        
        if (await User.findOne({ email }))
            return res.status(400).send({error: 'Usuario ja Cadastrado'});

        const user = await User.create(req.body);

        user.senha = undefined;

        return res.send({ user });
    }
    catch (err) {
        return res.status(400).send({error: 'Falha de Cadastro'})
    }
});

router.post('/registro/barraca', async (req, res)=> {
    try {
        const barraca = await Barraca.create(req.body);
        return res.send({ barraca });
    }
    catch (err) {
        return res.status(400).send({error: 'Falha de Cadastro'})
    }
});

module.exports = app => app.use('/auth', router);