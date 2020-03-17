const jwt = require('jsonwebtoken');
const config = require('../config/environments');

const checkAuth = (req,res,next) => {
    const token = req.headers['token'];
    if(!token)
        return {message: 'No Token provided'}
    
    jwt.verify(token,config.secret_key, (err,decoded) => {
        if(err)
            return {message: 'Failed to authenticate token'}
        req.user
        next();    
    })
}
module.exports = checkAuth;