const jwt = require('jsonwebtoken');
const config = require('../config/environments');

const checkAuth = (req,res,next) => {
    const token = req.headers['access-token'];

    if(!token){
        return res.json({message: 'No Token provided'});
    } else {
        jwt.verify(token,config.secret_key, (err,decoded) => {
            if(err){
                return res.json({message: 'You are not allow to be here', error:true, success: false}).status(401);
            } else { 
                req.decoded = decoded;
                next();
            }
        });
    }
}
module.exports = checkAuth;