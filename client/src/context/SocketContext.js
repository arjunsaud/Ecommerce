import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import api from "axios";

import { useNavigate } from "react-router-dom";

const url = "http://localhost:8001/";

export const SocketContext = createContext();

const SocketProvider = () => {
  const navigate = useNavigate();

  const [socket, setSocket] = useState();
  const { userid, role } = useSelector((state) => {
    return state.auth;
  });
  const { adminuser } = useSelector((state) => {
    return state.chat;
  });

  const [message, setMessage] = useState()

  const [cid, setCid] = useState();
  useEffect(() => {
    if (role === "") {
      navigate("/login");
    }
    createconv();
    connectToSocket();
  }, []);

  const connectToSocket = () => {
    const ws = new WebSocket(`ws://localhost:8001?userid=${userid}`);
    setSocket(ws);
  };

  socket?.addEventListener("open", () => {
    console.log("Connected");
  });
  socket?.addEventListener("close", () => console.log("Closed"));
  socket?.addEventListener("message", (event) => {
    const newMessage = JSON.parse(event.data);
    setMessage(newMessage)
  });

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
    <SocketContext.Provider value={{message,cid}}>
      <Outlet />
    </SocketContext.Provider>
  );
};

export default SocketProvider;
