import http from "http"
import app from "./app"
import WebSocket from "ws"
import url from "url"

const server=http.createServer(app)

const wss=new WebSocket.Server({server})

wss.on("connection",async(ws,request:any)=>{
    const { user } = url.parse(request.url, true).query;
    console.log(user);
    
    const loggedin:boolean=true
    if(!loggedin){
        return ;
    }
    
    ws.on("message",(message)=>{
    })

    ws.on("close",()=>{
    })
})


export default server