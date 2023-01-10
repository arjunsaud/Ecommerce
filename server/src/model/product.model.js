import mongoose from "mongoose"
const Schema=mongoose.Schema

const ProductSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    discount:{
        type:String,
        default:0,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        default:0,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
},{
    timestamps:true
})

const Product=mongoose.model("Products",ProductSchema)

export default Product