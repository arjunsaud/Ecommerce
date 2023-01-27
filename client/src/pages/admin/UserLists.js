import React, { useEffect, useState } from "react";

import axios from "../../config/axios";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserLists = () => {
  const navigate=useNavigate()
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await axios.get("users/getusers");
    setUsers(data.users);
  };


  const handleDelete=async(id)=>{
    const resp= await axios.delete(`users/deleteuser/${id}`);
    console.log(resp);
    if(resp.status===200){
      toast.success("User Deleted")
      fetchUsers()
    }else{
      toast.warning("Somthing Went Wrong")
    }
  }

  const handleView=(id)=>{
    navigate("/admin/buy",{state:{id}})
  }

  return (
    <div>
      <div className="m-4">
        <h4>Products List</h4>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((value, index) => {
                return (
                  <tr key={value._id}>
                    <td>{index + 1}</td>
                    <td>{value.fullname}</td>
                    <td>{value.email}</td>
                    <td>{value.role}</td>
                    <td>{value.address}</td>
                    <td>{value.phone}</td>
                    <td>
                      <button className="btn btn-danger mx-1" onClick={()=>handleDelete(value._id)}>Delete</button>
                      <button className="btn btn-info" onClick={()=>handleView(value._id)}>List Buy</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr><td>No Users</td></tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UserLists;
