import express from "express";
import cors from "cors";
import router from "./routes";

const app:express.Application=express();

app.use(express.json())

app.use(cors())

app.use(express.urlencoded({extended:true}))

app.use("/",router)

export default app