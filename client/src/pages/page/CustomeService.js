import React, { useEffect, useState, useRef } from "react";
import "../../assets/customer.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";
import api from "axios";
import { setMessage } from "../../slices/chat.slice";

const url = "http://localhost:8001/";

const CustomeService = () => {

  const [socket,setSocket]=useState()
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const { userid, role } = useSelector((state) => {
    return state.auth;
  });

  const { adminuser } = useSelector((state) => {
    return state.chat;
  });

  const [cid, setCid] = useState();
  useEffect(() => {
    if (role === "") {
      navigate("/login");
    }
    createconv();
    connectToSocket()
  }, []);

  const connectToSocket=()=>{
    const ws=new WebSocket(`ws://localhost:8001?userid=${userid}`)
    setSocket(ws)
  }

  socket?.addEventListener('open' , () => {
    console.log("Connected");
  })
  socket?.addEventListener('close' , () => console.log("Closed"))
  socket?.addEventListener('message' , (event) => {
    const newMessage = JSON.parse(event.data)
    console.log(newMessage);
    console.log("called");
    dispatch(setMessage(newMessage))
  })

  const createconv = async () => {
    const { data } = await api.get(`${url}conversation/${userid}/${adminuser}`);
    if (data.conversation.length === 0) {
      const { data } = await api.post(`${url}conversation`, {
        users: [userid, adminuser],
      });
      setCid(data.conversation._id);
    } else {
      setCid(data.conversation[0]._id);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Customer Support </h2>
      <div className="chatmain">
          {cid ? <Chat cid={cid}  socket={socket}/> : "loading"}
      </div>
    </>
  );
};




export default CustomeService;
