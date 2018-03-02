const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');
const cors = require('cors');

const authConfig = require('../../config/auth.json');
const Usuario = require('../../app/models/Usuario');
const router = express.Router();

router.use(cors());



function tokengen(params = {}){
   return jwt.sign( params, authConfig.secret, {
        expiresIn: 40000000000,
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

router.post('/recuperasenha', async (req ,res)=> {
    const { email } = req.body;

    try {
        const usuario = await Usuario.findOne ({ email });

        if (!usuario)
            return res.status(400).send({error: "Usuario não cadastrado"});

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 5);

        await Usuario.findByIdAndUpdate(usuario.id, {
            '$set': {
                senhaResetToken: token,
                senhaResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: 'danielmalagurti@gmail.com',
            template: 'auth/recupera_senha',
            context: { token },
        }, (err) => {
            if (err) 
                
                return res.status(400).send({error: 'Não foi possivel enviar o e-mail de recuperação'});
            
            return res.send();
        })

    } catch (err) {
       
        res.status(400).send({error: 'Erro na recuperação da senha, tente novamente'});
        
    };
});

router.post('/resetasenha', async (req, res) => {
    const { email, token, senha} = req.body;

    try {
        const usuario = await Usuario.findOne({ email })
         .select('+senhaResetToken senhaResetExpires');

         if(!usuario)
            return res.status(400).send({error: 'Usuario inexistente'});

        if(token !== usuario.senhaResetToken)
            return  res.status(400).send({error: 'Token invalido'});

        const now = new Date();

        if (now > usuario.senhaResetExpires)
            return res.status(400).send({error: 'Seu token inspirou, por favor gere um novo'});

        usuario.senha = senha;

        await usuario.save();
        res.send("Senha alterada com sucesso");

    } catch (err) {
        
        res.status(400).send({error:"Não foi possivel resetar a senha, tente novamente"})
        
    }
});

module.exports = app => app.use('/auth', router);