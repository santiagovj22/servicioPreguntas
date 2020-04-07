const router = require('express').Router()
const checkAuth = require('../middleware/isAuth');
const products = require('../services/Users');


router.get('/api/get_categories',async  (req,res) => {
    try{
        let response = await products.get_categories();
        res.json({message:response, error:false, success:true}).status(200);
    } catch(err){
        res.json({message:'An error ocurred', error:true, success:false}).status(400);
    }
})

module.exports = router;