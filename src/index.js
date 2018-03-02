const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors());

app.get('/barraca', function (req, res, next) {
    res.json({msg: 'Cors Ok, Todas as origens'})
  });

app.post('/barraca', function (req, res, next) {
    res.json({msg: 'Cors Ok, Todas as origens'})
  });

app.put('/barraca/barracaId', function (req, res, next) {
    res.json({msg: 'Cors Ok, Todas as origens'})
  });

app.delete('/barraca/barracaId', function (req, res, next) {
    res.json({msg: 'Cors Ok, Todas as origens'})
  });

app.get('/barraca/barracaId', function (req, res, next) {
    res.json({msg: 'Cors Ok, Todas as origens'})
  });

app.post('/auth/autenticacao', function (req, res, next) {
    res.json({msg: 'Cors Ok, Todas as origens'})
  });

app.post('/auth/registro', function (req, res, next) {
    res.json({msg: 'Cors Ok, Todas as origens'})
  });

app.post('/auth/autenticacao', function (req, res, next) {
    res.json({msg: 'Cors Ok, Todas as origens'})
  });

app.post('/auth/resetsenha', function (req, res, next) {
    res.json({msg: 'Cors Ok, Todas as origens'})
  });

app.post('/auth/recuperasenha', function (req, res, next) {
    res.json({msg: 'Cors Ok, Todas as origens'})
  });




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./app/controllers/index')(app);


app.listen(4000);