import React, { useEffect, useState } from "react";
import api from "axios";
import "../../assets/admin/userschat.css";
import { GoSearch } from "react-icons/go";
import profile from "../../assets/profile.jpg";
import Chat from "./Chat";
import { setMessage } from "../../slices/chat.slice";
import { useDispatch, useSelector } from "react-redux";

const url = "http://localhost:8001/";

const UsersChat = () => {

  const { userid } = useSelector((state) => {
    return state.auth;
  });

  const [socket,setSocket]=useState()
  const [current, setCurrent] = useState();
  const dispatch=useDispatch()

  const [clientUsers, setClientUsers] = useState([]);
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
    dispatch(setMessage(newMessage))
  })

  const fetchUsers = async () => {
    const { data } = await api.get(`${url}user/getAll`);
    setClientUsers(data.user);
  };


  const handleSwitch = (value) => {
    setCurrent({ userid: value.userid, email: value.email });
  };

  return (
    <div className="mainsec">
      <div className="usersmain">
        <div className="users">
          <h3 className="m-3">Users</h3>
          <Search />
          <div className="allusers">
            {clientUsers.map((value) => {
              return (
                <div key={value._id} className="userslist" onClick={() => handleSwitch(value)}>
                  <img src={profile} />
                  <div className="userlistdetails">
                    <span>{value.email}</span>
                    <label style={{ color: "green" }}>Online</label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {current ? (
          <div className="message">
            <h3 className="m-3 text-white">Messages</h3>
            <div className="user">
              <img src={profile} />
              <span className="text-white">{current.email}</span>
            </div>
              <Chat current={current} />
          </div>
        ) : (
          <div className="message">
            <h4 className="m-3 text-white">Select User for Conversation</h4>
          </div>
        )}
      </div>
    </div>
  );
};

const Search = () => {
  return (
    <div className="searchuser">
      <div className="input-group">
        <input
          type="text"
          required
          className="form-control"
          placeholder="Recipient's username"
        />
        <button className="input-group-text">
          <GoSearch />
        </button>
      </div>
    </div>
  );
};

export default UsersChat;
