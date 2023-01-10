import "dotenv/config";

const URL= process.env.MONGO_URL
const SECRET=process.env.JWT_SECRET
const PORT=process.env.PORT
const SALT=process.env.SALT_ROUNDS
 
export {URL,SECRET,PORT,SALT}