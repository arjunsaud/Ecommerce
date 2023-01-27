import React, { useEffect, useState } from "react";
import axios from "../../config/axios";

const AdminProfile = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchMe();
  }, []);

  const fetchMe = async () => {
    const { data } = await axios.get("auth/me");
    setUser(data.user);
  };

  const [userData, setUserData] = useState(user);

  const handleChange = (e) => {
    setUserData([...userData, (e.target.name = e.target.value)]);
  };

  console.log(userData);
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              height="180px"
              alt="profile"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
            <span className="font-weight-bold">{user.fullname}</span>
            <span className="text-black-50">{user.email}</span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-12">
                <label className="labels">Name</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="fullname"
                  className="form-control"
                  placeholder="first name"
                  value={user.fullname}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Mobile Number</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="phone"
                  className="form-control"
                  placeholder="enter phone number"
                  value={user.phone}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Email ID</label>
                <input
                  disabled
                  type="text"
                  onChange={handleChange}
                  name="email"
                  className="form-control"
                  placeholder="enter email"
                  value={user.email}
                />
              </div>
              <div className="col-md-12">
                <label className="labels">Address</label>
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="enter phone number"
                  value={user.address}
                />
              </div>
            </div>
            <div className="mt-2 text-center">
              <button className="btn btn-primary profile-button" type="button">
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <ChangePassword />
      </div>
    </div>
  );
};

const ChangePassword = () => {
  return (
    <div className="col-md-4">
      <div className="p-3 py-5">
        <div className="d-flex justify-content-between align-items-center experience">
          <span>Change Password</span>
        </div>
        <br />
        <form>
          <div className="col-md-12">
            <label className="labels">Old Password</label>
            <input
              type="text"
              name="oldpass"
              className="form-control"
              placeholder="Old Password"
              value=""
            />
            <label className="labels">New Password</label>
            <input
              type="text"
              name="pass"
              className="form-control"
              placeholder="New Password"
              value=""
            />
            <label className="labels">Confirm Password</label>
            <input
              type="text"
              name="confirmpass"
              className="form-control"
              placeholder="Confirm Password"
              value=""
            />
            <button className="btn btn-info mt-2">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminProfile;
