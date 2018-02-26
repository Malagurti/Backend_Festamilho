const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ error:'Token não informado'});

    const partes = authHeader.split (' ');
    
    if (!partes.length === 2)
        return res.status(401).send({ error: "Erro de Token"});
    
        const [scheme, token] = partes;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({error: 'Token: Erro de formato'});

    jwt.verify(token,authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({error: 'Token invalido'});

        req.usuarioId = decoded.id;
        return next();
    });


};