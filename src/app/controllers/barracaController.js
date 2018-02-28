const express = require('express');

const Usuario = require('../models/Usuario');
const Barraca = require('../models/Barraca');
const Cardapio = require('../models/Cardapio');
const authMiddleware = require('../middlewares/auth');


const router = express.Router();

router.use(authMiddleware);

router.get('/', async ( req,res) => {
   try {
     const barracas = await Barraca.find().populate(['usuario', 'cardapios']);

     return res.send([ barracas ]);
    
   } catch (err) {
     return res.status(400).send({error: "Erro ao carregar Barraca"});
       
   }
});

router.get('/:barracaId', async ( req, res) => {
    try {
        const barraca = await Barraca.findById(req.params.barracaId).populate(['usuario', 'cardapios']);
   
        return res.send([ barraca ]);
       
      } catch (err) {
        return res.status(400).send({error: "Erro ao carregar Barraca"});
          
      }
});

router.post('/', async ( req, res) => {
    
    try {
      const {nome, curso, semestre, periodo, localizacao, formapagamento, cardapios} = req.body;

      const barraca = await Barraca.create({nome, curso, semestre, periodo, localizacao, formapagamento, usuario: req.usuarioId});
      
      await Promise.all(cardapios.map(async cardapio => {
        const barracaCardapio = new Cardapio({ ...cardapio, barraca: barraca._id });

        await barracaCardapio.save();

        barraca.cardapios.push(barracaCardapio);
      }));
      

      await barraca.save();

      return res.send({ barraca });
        
    } catch (err) {
      console.log(err);
      return res.status(400).send({error: "Erro de cadastro de barraca"})
        
    };

});

router.put('/:barracaId', async ( req, res) => {
   
      try {

        const {nome, curso, semestre, periodo, localizacao, formapagamento, cardapios} = req.body;
  
        const barraca = await Barraca.findByIdAndUpdate(req.params.barracaId,{
            nome, 
            curso, 
            semestre,
            periodo,
            localizacao,
            formapagamento
        }, {new: true});

        barraca.cardapios = [];
        await Cardapio.remove({ barraca: barraca._id});
        
        await Promise.all(cardapios.map(async cardapio => {
          const barracaCardapio = new Cardapio({ ...cardapio, barraca: barraca._id });
  
          await barracaCardapio.save();
  
          barraca.cardapios.push(barracaCardapio);
        }));
        
  
        await barraca.save();
  
        return res.send({ barraca });
          
      } catch (err) {
        console.log(err);
        return res.status(400).send({error: "Erro de cadastro de barraca"})
          
      };
});

router.delete('/:barracaId', async ( req, res) => {
    try {
        await Barraca.findByIdAndRemove(req.params.barracaId);
   
        return res.send();

      } catch (err) {
        return res.status(400).send({error: "Erro ao deletar a barraca"});
          
      }
});

module.exports  = app => app.use('/barraca', router);