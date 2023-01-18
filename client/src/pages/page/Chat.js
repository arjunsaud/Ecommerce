import React, { useEffect, useState } from "react";
import "../../assets/customer.css";
import profile from "../../assets/profile.jpg";
import { useSelector } from "react-redux";
import api from "axios";

const url = "http://localhost:8001/";

const Chat = ({cid}) => {
  const { userid } = useSelector((state) => {
    return state.auth;
  });

  const [chats, setChats] = useState([]);

  useEffect(()=>{
    fetchChats()
  },[])

  const fetchChats = async () => {
    const {data} = await api.get(`${url}message/${cid}`);
    setChats(data.message);
  };

  return (
    <div className="chatbox">
      {chats.map((value) => {
        return (
          <div key={value._id}>
            {value.sender_id === userid ? (
              <div className="sender">
                <div className="messagesender">{value.message}</div>
                <img src={profile} alt="profile" />
              </div>
            ) : (
              <div>
                <div className="receiver">
                  <img src={profile} alt="profile" />
                  <div className="messagereceiver">{value.message} </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
