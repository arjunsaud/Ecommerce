import mongoose from "mongoose";
const Schema=mongoose.Schema

const BrandSchema=new Schema({
    brand:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Brand=mongoose.model("Brand",BrandSchema)

export default Brand