const mongoose=require('mongoose');
const Schema = mongoose.Schema; 

const restSchema=Schema(
{
    name:{type: String , required :true, trim: true },
    address:{ type: String, required :true, trim: true },
    openinghrs: {type: String, required : true, trim: true },
    closinghrs:{type: String, required: true, trim: true},
    image:{ data: Buffer,contentType: String },
    products: [{ type: Schema.Types.ObjectId, ref:'Product' }]
});



module.exports=mongoose.model('Restaurant',restSchema);
