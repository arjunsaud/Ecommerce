import Review from "../model/review.model.js"
import ReviewServices from "./review.services.js"

const reviewServices=new ReviewServices(Review)

export default reviewServices