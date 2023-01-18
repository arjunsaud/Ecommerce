import React, { useEffect, useState, useRef } from "react";
import "../../assets/customer.css";
import profile from "../../assets/profile.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";

import api from "axios";
import { toast } from "react-toastify";

const url = "http://localhost:8001/";

const CustomeService = () => {
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
  }, []);

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
        <div className="chat">
          <Profile />
          {cid ? <Chat cid={cid} /> : "loading"}
          <Send cid={cid} />
        </div>
      </div>
    </>
  );
};

const Send = ({ cid }) => {
  const { userid } = useSelector((state) => {
    return state.auth;
  });

  const message = useRef();

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.current.value !== "") {
      const resp = await api.post(url + "message", {
        message: message.current.value,
        conversation: cid,
        sender_id: userid,
      });
      message.current.value = "";
    } else {
      toast.warning("Message is Empty");
    }
  };
  return (
    <div className="messagesection input-group">
      <input
        type="text"
        required
        ref={message}
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

export default CustomeService;
