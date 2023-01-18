import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.jpg";
import api from "axios";
import { useSelector } from "react-redux";

const url = "http://localhost:8001/";

const Messages = ({ cid }) => {
    const { userid, role, email } = useSelector((state) => {
        return state.auth;
      });
    
  const [chats, setChats] = useState([]);
  useEffect(() => {
    fetchChats();
  }, [cid]);

  const fetchChats = async () => {
    const { data } = await api.get(`${url}message/${cid}`);
    setChats(data.message);
  };

  return (
    <div>
      {chats.length>0?chats.map((value) => {
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
      }):"No Messages Yet"
    }
    </div>
  );
};

export default Messages;
