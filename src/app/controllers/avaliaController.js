const express = require('express');
const Barraca = require('../models/Barraca');
const Avaliacao = require('../models/Avaliacao')
const authMiddleware = require('../middlewares/auth');

const router = express.Router();


router.use(authMiddleware);



router.get('/:barracaId', async ( req, res) => {
    try {

      const avaliacao = await Avalicao.findById(req.params.barracaId).populate(['nota','barraca','data']);

      return res.send( [ avaliacao ]);

      } catch (err) {
        return res.status(400).send({error: "Erro ao carregar avaliacao"});

      }
});

router.post('/', async ( req, res) => {

    try {
      const {barraca,nota,data} = req.body;

      if (await Avaliavao.findOne({ data }))
          return res.status(400).send({error: 'Voce ja votou hoje'});


      const avaliacao = await Avaliacao.create({nota,data, barraca: req.barracaId});

      await avaliazao.save();

      return res.send({ avaliacao });

    } catch (err) {
      console.log(err);
      return res.status(400).send({error: "Erro ao realizar a votacao"})

    };

});


module.exports  = app => app.use('/votacao', router);
