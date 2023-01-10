import {z} from "zod"
import mod from "zod/lib"
import logger from "../config/logger.js"
import { errorResponse } from "../utils/response.utils.js"

const ProductValidationSchema=z.object({
    name:z.string({
        required_error:"Name is Required"
    }),
    price:z.string({
        required_error:"Price is Required"
    }),
    category:z.string({
        required_error:"Category is Required"
    }),
    model:z.string({
        required_error:"Model is Required"
    }),
    rating:z.string({
        required_error:"Rating is Required"
    }),
    brand:z.string({
        required_error:"Brand is Required"
    }),
    image:z.string().optional()
})

const productValidator={
    validateCreateProduct:(req,res,next)=>{
        let validationData;
        if(req.file){
            const image=req.file.originalname
            validationData={...req.body,image}
        }else{
            validationData=req.body
        }
        const parsedSchema=ProductValidationSchema.safeParse(validationData)
        if(!parsedSchema.success){
            logger.error(parsedSchema)
            return errorResponse(res,"Validation Error",parsedSchema.error,409)
        }
        req.body=validationData
        next()
    }
}

export default productValidator