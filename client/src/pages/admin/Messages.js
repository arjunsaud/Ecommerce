import React, { useContext, useEffect, useRef, useState } from "react";
import profile from "../../assets/profile.jpg";
import api from "axios";
import { AdminSocketContext } from "../../context/AdminSocketContext";

const url = "http://localhost:8001/";

const Messages = () => {
  const {userid, cid, message } = useContext(AdminSocketContext);

  const [chats, setChats] = useState([]);
  useEffect(() => {
    fetchChats();
  }, [cid]);

  useEffect(() => {
    if (message) {
      setChats((prev) => [...prev, message]);
    }
  }, [message]);

  const fetchChats = async () => {
    if (cid) {
      const { data } = await api.get(`${url}message/${cid}`);
      setChats(data.message);
    }
  };

  const scrollRef=useRef(null)

  useEffect(()=>{
    scrollRef.current.scrollIntoView({behavior:'smooth'})
  },[chats])

  return (
    <div>
      {chats.length > 0 ? (
        chats.map((value, index) => {
          return (
            <div key={index}>
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
        })
      ) : (
        <span className="text-white">No Messages Yet</span>
      )}
      <div ref={scrollRef} />
    </div>
  );
};

export default Messages;
