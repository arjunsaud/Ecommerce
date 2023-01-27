import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import api from "axios";

const url = "http://localhost:8001/";

export const AdminSocketContext = createContext();

const AdminSocketProvider = () => {

    const { userid } = useSelector((state) => {
        return state.auth;
      });

      const [message, setMessage] = useState()
    
      const [socket,setSocket]=useState()

      const [current, setCurrent] = useState();
    
      const [clientUsers, setClientUsers] = useState([]);

      const [cid, setCid] = useState();


      useEffect(() => {
        fetchUsers();
        connectToSocket()
      },[]);
    
      const connectToSocket=()=>{
        const ws=new WebSocket(`ws://localhost:8001?userid=${userid}`)
        setSocket(ws)
      }
    
      socket?.addEventListener('open' , () => console.log("Socket connected"))
      socket?.addEventListener('close' , () => console.log("Closed"))
      socket?.addEventListener('message' , (event) => {
        const newMessage = JSON.parse(event.data)
        setMessage(newMessage)
      })
    
      const fetchUsers = async () => {
        const { data } = await api.get(`${url}user/getAll`);
        setClientUsers(data.user);
      };
    
    
      const handleSwitch = (value) => {
        setCurrent({ userid: value.userid, email: value.email });
      };
    
    
  return (
    <AdminSocketContext.Provider value={{userid,message,setMessage,handleSwitch,current,clientUsers,setCid,cid}}>
      <Outlet />
    </AdminSocketContext.Provider>)
}

export default AdminSocketProvider