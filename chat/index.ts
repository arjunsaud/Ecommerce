import server from "./src/config/server";
import Connection from "./src/config/dbcon";

import { vars } from "./src/config/vars";

const conn=new Connection();

(async ()=>{
    await conn.connectDb()
    server.listen(vars.PORT,()=>{
        console.log("Server is Running : "+vars.PORT);  
    })
})()