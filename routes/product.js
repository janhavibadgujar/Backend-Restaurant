const express=require('express');
const router = express.Router();

const Restaurant= require('../models/restaurant')
const Product = require('../models/product')


//Product....
router.post('/:restaurant_id',(req, res, next) => {
  console.log(req);
    const product = new Product({
      pname: req.body.pname,
    
      price: req.body.price,
      category: req.body.category
    });
    product.save((err,Product)=>{
        if(err)
        {
            res.json({"msg":"Failed to save"});
        }
        else
        {
            
            res.json({ message: 'Product saved successfully!'});
        }
    });
    Restaurant.updateOne(
      { _id: req.params.restaurant_id }, 
      { $push: { products: product._id } },
      (error, success)=> {
        if (error) {
          console.log(error);
        } 
      });
  });

  //Update Product

  router.put('/:id', (req, res, next) => {
    const product = new Product({
      _id: req.params.id,
      pname: req.body.pname,
      price: req.body.price,
      category: req.body.category
    });
    Product.updateOne({_id: req.params.id}, product).then(
      () => {
        res.json({
          message: 'Updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.json({
          error: error
        });
      }
    );
  });

  //Delete Product

 

  router.delete('/delete/:restaurant_id/:product_id', async (req, res) => 
{
	try {
		const product = await Product.findByIdAndDelete(req.params.product_id)
		if (!product) {
					return res.status(404).send("product is not available for delete.")
					}

			// deleting the product id from restaurant product array
			Restaurant.updateOne({_id:req.params.restaurant_id}, 
				{ $pull: {products: req.params.product_id } }
				,(err, docs) =>{
				if (err){
					console.log("------------------------");
					return res.status(500).send("error in deletion of product from products array.");
				}
				else{
					res.json({"message":"Product Deleted successfully"});
				}
			})
		} 
		catch (e) 
		{	res.status(500).send(e);
		}	
})
  module.exports = router;