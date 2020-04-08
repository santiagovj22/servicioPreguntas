const router = require('express').Router()
const checkAuth = require('../middleware/isAuth');
const products = require('../services/Users');


router.get('/api/get_categories', checkAuth ,async  (req,res) => {
    try{
        let response = await products.get_categories();
        res.json({message:response, error:false, success:true}).status(200);
    } catch(err){
        res.json({message:'An error ocurred', error:true, success:false}).status(400);
    }
})

router.get('/api/get_children_categories', checkAuth, async (req,res) => {
   const { id } = req.body
    try{
        let response = await products.get_children_categories(id);
        res.json({message:response, error:false, success:true}).status(200);
    } catch(err){
        res.json({message:'an error ocurred', error:true, success:false}).status(400)
    }
})

router.post('/api/create_product/:id', checkAuth, async (req,res) => {
    storeid = req.params.id
    const { categoryid, title, description,asin,usd,price,stock,weight,height,length,width,status,createdsince } = req.body
    try{
        let respuesta = await products.create_product(categoryid,storeid,title, description,asin,usd,price,stock,weight,height,length,width,status,createdsince);
        res.json({data:respuesta, SUCCESS: true, ERROR: false}).status(200);
    } catch(err){
        res.json({message:'an error ocurred', error:true, success:false}).status(400)
    }
})
module.exports = router;