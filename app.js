const express= require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const app=express();
const cors = require("cors");
const route=require('./routes/route');
const routes = require('./routes/product');


mongoose.connect('mongodb://localhost:27017/restaurant');

mongoose.connection.on('connected',()=>{
    console.log("Connected to the Database");
})

mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log("Errror in conection ,"+err);
    }
    else
    {console.log("Error in the database connection.....");}
 
});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use('/restaurant',route);
app.use('/product', routes);

var port = process.env.PORT || 3000;







app.listen(port,()=>{
    console.log("Server started at port..."+port);
});

