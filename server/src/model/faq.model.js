import mongoose from "mongoose"
const Schema=mongoose.Schema

const FaqSchema=new Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Faq=mongoose.model("faq",FaqSchema)

export default Faq