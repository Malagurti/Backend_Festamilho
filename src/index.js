const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('./app/middlewares/cors');


const port = 4000
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors)

require('./app/controllers/index')(app);


app.listen(port, function() {
    console.log(`BACKEND esta rodando na porta ${port}.`)
})
