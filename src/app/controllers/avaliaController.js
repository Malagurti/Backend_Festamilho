const express = require('express');
const Barraca = require('../models/Barraca');
const Avaliacao = require('../models/Avaliacao')
const authMiddleware = require('../middlewares/auth');

const router = express.Router();


router.use(authMiddleware);



router.get('/:barracaId', async (req, res, next) => {
  Avaliacao.aggregate([
    { "barracaId": "$barraca" },
    {
      "$group": {
        "_id": "$barraca",
        "notaAvg": { "$avg": "$nota" }
      }
    }
  ], function (err, results) {
    if (err) res.status(500).json({ errors: [error] })
    Barraca.populate(results, { "path": "_id" },
      function (err, result) {
        if (err) res.status(500).json({ errors: [error] })
          res.json(result)
      });
  })
});

router.get("/:barracaId", function(req, res){
  Barraca.findById(req.params.barracaId).populate("votacao").exec(function(err, showBarraca){
     if(err){
        res.status(500).json({ errors: [error] })
     } else{
         var total = 0;
         for(var i = 0; i < showBarraca.votacao.length; i++) {
             total += showBarraca.votacao[i].nota;
         }
         var avg = total / showBarraca.votacao.lenght;
         res.json(avg);
     }
  }); 
});

router.post('/', async (req, res) => {

    try {
      const { barraca, nota, data } = req.body;

      if (await Avaliavao.findOne({ data }))
        return res.status(400).send({ error: 'Voce ja votou hoje' });


      const avaliacao = await Avaliacao.create({ nota, data, barraca: req.barracaId });

      await avaliazao.save();

      return res.send({ avaliacao });

    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: "Erro ao realizar a votacao" })

    };

  });


  module.exports = app => app.use('/votacao', router);
