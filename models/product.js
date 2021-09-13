const mongoose=require('mongoose');
const Schema = mongoose.Schema; 

const prodSchema= Schema(
    {
        pname: {type: String, required: true, trim: true},
        pimage:{data: Buffer, contentType: String},
        price:{type: Number, required: true},
        category:{type: String, required: true, trim: true}
       
    });

    module.exports=mongoose.model('Product',prodSchema);