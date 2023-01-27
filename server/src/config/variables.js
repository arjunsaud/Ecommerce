import "dotenv/config";

const URL= process.env.MONGO_URL
const SECRET=process.env.JWT_SECRET
const PORT=process.env.PORT
const SALT=process.env.SALT_ROUNDS
const EMAIL=process.env.EMAIL
const PASSWORD=process.env.PASSWORD
 
export {URL,SECRET,PORT,SALT,EMAIL,PASSWORD}