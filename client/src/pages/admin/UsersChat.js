import React, { useContext } from "react";
import "../../assets/admin/userschat.css";
import { GoSearch } from "react-icons/go";
import profile from "../../assets/profile.jpg";
import Chat from "./Chat";

import { AdminSocketContext } from "../../context/AdminSocketContext";

const UsersChat = () => {
  const { clientUsers, current, handleSwitch } = useContext(AdminSocketContext);

  return (
    <div className="mainsec">
      <div className="usersmain">
        <div className="users">
          <h3 className="m-3 text-white">Users</h3>
          {/* <Search /> */}
          <div className="allusers">
            {clientUsers.map((value) => {
              return (
                <div
                  key={value._id}
                  className="userslist"
                  onClick={() => handleSwitch(value)}
                >
                  <img src={profile} alt="profile" />
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
              <img src={profile} alt="profile"/>
              <span className="text-white">{current.email}</span>
            </div>
            <Chat />
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
