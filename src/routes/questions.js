const router = require('express').Router();
const questions = require('../services/Users');


router.get('/api/open_questions', async (req,res) => {
    try{
        let respuesta = await questions.getOpenQuestions();
        res.json({questions:respuesta}).status(200);
    } catch(err){
        res.json({error:true, message:"Error"}).status(400)
    }
})

router.post('/api/delete_question/:id', async (req,res) => {
    questionid = req.params.id;
    try {
        let respuesta=await questions.deleteQuestions(questionid)
        res.json({questions:respuesta}).status(200);
    } catch (err) {
        res.json({error:true, message:"Error"}).status(400);
    }
})
router.post('/api/create_question/:id', async (req,res) => {
    userid = req.params.id;
    try{
       const { content } = req.body;
       let respuesta = await questions.createQuestion(userid,content);
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