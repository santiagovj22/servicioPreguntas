const jwt = require('jsonwebtoken');
const config = require('../config/environments');

const checkAuth = (req,res,next) => {
    const token = req.headers['token'];
    if(!token)
        return {message: 'No Token provided'}
    try{
        const verified = jwt.verify(token,config.secret_key);
        req.user = verified;
        next()
    } catch(err) {
        return {message: 'Invalid Token'}
    }
}
module.exports = checkAuth;