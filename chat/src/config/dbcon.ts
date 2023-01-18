import mongoose from "mongoose";
import { vars } from "./vars";

export interface IConnection{
    connectDb:()=>Promise<void>
    disconnectDb:()=>Promise<void>
}


export default class Connection implements IConnection{

    constructor(){
        mongoose.set('strictQuery',false)
    }

    async connectDb():Promise<void>{
        await mongoose.connect("mongodb+srv://nodeuser:nodeuser@cluster0.tw3sw.mongodb.net/newecomchat?retryWrites=true&w=majority")
        console.log("Database Connected")
     }
 
     async disconnectDb(): Promise<void>{
         await mongoose.disconnect()
     }

}