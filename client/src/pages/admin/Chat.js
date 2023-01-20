import React, { useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import api from "axios";
import Messages from "./Messages";
import { BiSend } from "react-icons/bi";
import { toast } from "react-toastify";
import { AdminSocketContext } from "../../context/AdminSocketContext";

const url = "http://localhost:8001/";

const Chat = () => {
  const { current, setCid } = useContext(AdminSocketContext);

  const { userid } = useSelector((state) => {
    return state.auth;
  });

  const createconv = async () => {
    const { data } = await api.get(
      `${url}conversation/${current.userid}/${userid}`
    );
    if (data.conversation.length === 0) {
      const { data } = await api.post(`${url}conversation`, {
        users: [userid, current.userid],
      });
      setCid(data.conversation._id);
    } else {
      setCid(data.conversation[0]._id);
    }
  };
  useEffect(() => {
    createconv();
  }, [current]);
  return (
    <>
      <div className="usermessages">
        <div className="userchatbox">
          <Messages />
        </div>
      </div>
      <Send />
    </>
  );
};

const Send = () => {
  const { cid ,setMessage} = useContext(AdminSocketContext);

  const { userid } = useSelector((state) => {
    return state.auth;
  });

  const message = useRef();

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.current.value !== "") {
      const { data } = await api.post(url + "message", {
        message: message.current.value,
        conversation: cid,
        sender_id: userid,
      });
      setMessage(data.messages);
      message.current.value = "";
    } else {
      toast.warning("Message is Empty");
    }
  };
  return (
    <div className="sendmessage input-group">
      <input
        ref={message}
        type="text"
        className="form-control"
        placeholder="Type Message Here"
      />
      <button onClick={handleSend} className="input-group-text">
        <BiSend />
      </button>
    </div>
  );
};

export default Chat;
