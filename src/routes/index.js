const router = require('express').Router();
const users = require('../services/Users');


router.post('/api/register',async (req,res) => {
    try {
        const { email, password } = req.body
        if (!req.body.email || !req.body.password ){
            res.json({SUCCESS: false, message:'Enter your email and password'});
        }
        let respuesta= await users.registerUsers(email,password);
        if(!respuesta.error){
            res.json({user:respuesta}).status(200);
        } else {
            res.json({user:respuesta}).status(400);
        }
    } catch (err) {
       res.json({error: true, message:"Error "}).status(400)
    }
})

router.post('/api/login', async (req,res) => {
    try{
        const{ email, password} = req.body
        let respuesta=await users.login(email,password)
        if(!respuesta.error){
            res.json({users:respuesta}).status(200);
        }else{
            res.json({users:respuesta}).status(400);
        }
    } catch(err) {
        res.json({error:true, message:"Error"}).status(400)
    }
})

module.exports = router;