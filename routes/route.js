const express=require('express');
const router = express.Router();

const Restaurant= require('../models/restaurant');


router.get('/',(req,res)=>{
  Restaurant.find(function(err,post)
  {
      if(err)
      {
          res.json({"msg":"Failed to fetch data"});
      }
      else
      {
          res.json(post);
      } 
      
  })
  
});

//Get Restaurant
router.get('/:restaurant_id',async (req, res) => {
  await Restaurant.find({_id:req.params.restaurant_id}).populate('products').exec((err,products) => {
  if (!products) {
  return res.status(404).send();
  }
  if(err)
  {
      res.status(500).send();
  }
   res.json(products);
  });

  });

//Post Restaurant
router.post('/', (req, res) => {
//console.log(req.body);
    const rest = new Restaurant({
      name: req.body.name,
      address: req.body.address,
      openinghrs: req.body.openinghrs,
      closinghrs:req.body.closinghrs
    });
    rest.save((err,Rest)=>{
        if(err)
        {
            res.json({"msg":"Failed to save"});
        }
        else{
            
            res.json({ message: 'Post saved successfully!'});
        }
    });
    //res.end();
  });

  //Update Restaurant

  router.put('/:id', (req, res, next) => {
    const rests = new Restaurant({
      _id: req.params.id,
      name: req.body.name,
      address: req.body.address,
      openinghrs: req.body.openinghrs,
      closinghrs:req.body.closinghrs,
      product:req.body.productId
    });
    Restaurant.updateOne({_id: req.params.id}, rests).then(
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

  //Delete Restaurant
  router.delete('/:id', (req, res, next) => {
    Restaurant.deleteOne({_id: req.params.id}).then(
      () => {
        res.json({
          message: 'Deleted!'
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


  module.exports = router;

 