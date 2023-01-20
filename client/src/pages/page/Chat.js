import React, { useContext, useEffect, useRef, useState } from "react";
import "../../assets/customer.css";
import profile from "../../assets/profile.jpg";
import { useSelector } from "react-redux";
import api from "axios";
import { toast } from "react-toastify";
import { SocketContext } from "../../context/SocketContext";

const url = "http://localhost:8001/";

const Chat = () => {
  const { message, cid } = useContext(SocketContext);

  const { userid } = useSelector((state) => {
    return state.auth;
  });

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

  return (
    <div className="chat">
      <Profile />
      <div className="chatbox">
        {chats.length > 0
          ? chats.map((value, index) => {
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
          : "Loading"}
      </div>
      <Send cid={cid} setChats={setChats} />
    </div>
  );
};

const Send = ({ cid, setChats }) => {
  const { userid } = useSelector((state) => {
    return state.auth;
  });

  const msg = useRef();

  const handleSend = async (e) => {
    e.preventDefault();
    if (msg.current.value !== "") {
      const { data } = await api.post(url + "message", {
        message: msg.current.value,
        conversation: cid,
        sender_id: userid,
      });
      setChats((prev) => [...prev, data.messages]);
      msg.current.value = "";
    } else {
      toast.warning("Message is Empty");
    }
  };
  return (
    <div className="messagesection input-group">
      <input
        type="text"
        required
        ref={msg}
        className="form-control"
        placeholder="Type Message Here..."
      />
      <div className="input-group-append">
        <button onClick={handleSend} className="input-group-text bg-primary">
          send
        </button>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="profilesection">
      <img width="50px" src={profile} alt="profile" />
      <div className="topsection">
        <label>Customer Service User</label>
        <span>Customer Support</span>
      </div>
    </div>
  );
};

export default Chat;
