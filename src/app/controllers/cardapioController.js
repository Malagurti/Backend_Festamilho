const express = require('express');
const Barraca = require('../models/Barraca');
const Cardapio = require('../models/Cardapio');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', async ( req,res) => {
    try {
      const cardapios = await Cardapio.find().populate([ 'cardapios' ]);

      return res.send( cardapios );

    } catch (err) {
      return res.status(400).send({error: "Erro ao carregar o cardapio"});

    }
 });


 module.exports  = app => app.use('/cardapio', router)
 router.get('/:cardapioId', async ( req, res) => {
    try {

      const cardapio = await Cardapio.findById(req.params.cardapioId).populate( ['cardapio', 'barraca'] );

      return res.send([ cardapio ]);

      } catch (err) {
        return res.status(400).send({error: "Erro ao carregar cardapio"});

      }
});

module.exports  = app => app.use('/cardapio', router);
