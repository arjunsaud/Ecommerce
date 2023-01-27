import mongoose from "mongoose"
const Schema=mongoose.Schema

const OfferSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Offer=mongoose.model("offer",OfferSchema)

export default Offer