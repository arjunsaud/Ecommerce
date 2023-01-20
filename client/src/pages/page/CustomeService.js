import React from "react";
import "../../assets/customer.css";

import Chat from "./Chat";

const CustomeService = () => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Customer Support </h2>
      <div className="chatmain">
        <Chat />
      </div>
    </>
  );
};

export default CustomeService;
