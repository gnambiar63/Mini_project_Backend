let jwt = require('jsonwebtoken');
let data = require('./data');
exports.verifyToken = (req, res, next) =>
{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined')
    {
        const bearer = bearerHeader.split(' ');
        jwt.verify(bearer[1],data.jwtSecretKey, (err, d) =>
        {
            if(!err)
            {
                //req.<attr> = d.attr
                next();
            }
            else
            {
                res.sendStatus(403);
            }
        });
    }
    else
    {
        res.sendStatus(403);
    }
}