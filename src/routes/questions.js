const router = require('express').Router();
const questions = require('../services/Users');


router.get('/api/open_questions', async (req,res) => {
    try{
   
            const questions = [
                {
                    "questionid": "25",
                    "userid": 21,
                    "name": null,
                    "content": "test 2.1",
                    "status": 1,
                    "productid": 132,
                    "title": "Pride Mobility Jazzy 614 HD Silla para trabajo pesado Candy Apple Red",
                    "createdsince": "2020-03-25T02:28:01.057Z"
                },
                {
                    "questionid": "23",
                    "userid": 56,
                    "name": null,
                    "content": "test 2.1",
                    "status": 1,
                    "productid": 26,
                    "title": "HeartWay Passport EasyMove Scooter Remoto Automático Plegable Rojo",
                    "createdsince": "2020-03-25T02:22:00.967Z"
                },
                {
                    "questionid": "22",
                    "userid": 56,
                    "name": null,
                    "content": "test 2",
                    "status": 1,
                    "productid": 55,
                    "title": "E Wheels EW 36O 3 Wheel 350 lbs Weight Capacity Scooter Orange",
                    "createdsince": "2020-03-25T02:20:00.775Z"
                },
                {
                    "questionid": "21",
                    "userid": 19,
                    "name": "maria",
                    "content": "test",
                    "status": 1,
                    "productid": 55,
                    "title": "E Wheels EW 36O 3 Wheel 350 lbs Weight Capacity Scooter Orange",
                    "createdsince": "2020-03-24T21:01:03.812Z"
                }
            ]
        //let respuesta = await questions.getOpenQuestions();
        res.json({questions:questions}).status(200);
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
router.post('/api/create_question/:id/:productid', async (req,res) => {
    userid = req.params.id;
    productid = req.params.productid;
    try{
       const { content } = req.body;
       let respuesta = await questions.createQuestion(userid,content, productid);
       if(!respuesta.error){
           res.json({data:respuesta, SUCCESS: true, ERROR: false}).status(200);
       } else {
           res.json({data:respuesta, error: true}).status(400)
       }
    } catch(err){
        res.json({error:true, message: 'Error'}).status(400);
    }
})

router.post('/api/create_answer/:id', async (req,res) => {
   questionid = req.params.id;
    try {
        const { answer } = req.body;
        let result = await questions.createAnswer(answer, questionid);
        res.json({data: result}).status(200);
    } catch (error) {
        res.json({error:true, message: 'Error'}).status(400);
    }
})

router.get('/api/get_questions_by_productid/:productid', async (req,res,next) => {
    productid = req.params.productid;
    try{
        let respuesta = await questions.get_questions_by_productid(productid);
        res.json({data: respuesta, success: true, error: false}).status(200);
    } catch(err){
        res.json({data: respuesta, success: false, error: true}).status(400);
    }
})
module.exports = router;