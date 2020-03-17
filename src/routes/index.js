const router = require('express').Router();
const users = require('../services/Users');



router.post('/api/register',async (req,res) => {
    try {
        const { email, password } = req.body
        let respuesta= await users.registerAdmin(email,password);
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
        let respuesta=await users.loginAdmin(email,password)
        if(!respuesta.error){
            res.json({users:respuesta}).status(200);
        }else{
            res.json({users:respuesta}).status(400);
        }
    } catch(err) {
        res.json({error:true, message:"Error"}).status(400)
    }
})

router.get('/api/open_questions', async (req,res) => {
    try{
        let respuesta = await users.getOpenQuestions();
        res.json({questions:respuesta}).status(200);
    } catch(err){
        res.json({error:true, message:"Error"}).status(400)
    }
})

router.post('/api/delete_question/:id', async (req,res) => {
    questionid = req.params.id;
    try {
        let respuesta=await users.deleteQuestions(questionid)
        res.json({questions:respuesta}).status(200);
    } catch (err) {
        res.json({error:true, message:"Error"}).status(400);
    }
})
router.post('/api/create_question/:id', async (req,res) => {
    userid = req.params.id;
    try{
       const { content } = req.body;
       let respuesta = await users.createQuestion(userid,content);
       if(!respuesta.error){
           res.json({data:respuesta}).status(200);
       } else {
           res.json({data:respuesta}).status(400)
       }
    } catch(err){
        res.json({error:true, message: 'Error'}).status(400);
    }
})
module.exports = router;