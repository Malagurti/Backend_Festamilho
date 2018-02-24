const express = require('express');

const Barraca = require("../models/Barraca");

const router = express.Router();

router.post("/registro", async (req, res)=> {
    const {nome} = req.body;

    try{
        if(await Barraca.findOne({ nome }))
            return res.status(400).send ({error : "Barraca ja cadastrada"});

        const barraca = await Barraca.create(req.body);

        return res.send({barraca});
    }
    catch (err){
        return res.status(400).send({error: "Falha no cadastro, contate os magos do Backend ;)"})
    }
});

router.post("/get", async (req,res)=> {
    const {nome} = req.body;

    const barraca = await Barraca.findOne({ nome });

    if(!nome ){
        return res.status(400).send({error: "Barraca nao esta cadastrada"});
    }

    res.send ({ barraca });
});

module.exports = app => app.use ('barraca', router); 
    