import axios from "../../config/axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { object, ref, string } from "yup";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState([]);
  const [check,setCheck]=useState(true)

  useEffect(() => {
    fetchMe();
  }, [check]);

  const fetchMe = async () => {
    const { data } = await axios.get("auth/me");
    setUser(data.user);
  };

  const [edit, setEdit] = useState(true);

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              height="160px"
              alt="profile"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
            <span className="font-weight-bold">{user.fullname}</span>
            <span className="text-black-50">{user.email}</span>
          </div>
          <center>
            {edit ? (
              <button
                onClick={() => setEdit(!edit)}
                className="btn btn-success"
              >
                Edit
              </button>
            ) : (
              <button onClick={() => setEdit(!edit)} className="btn btn-danger">
                Cancel
              </button>
            )}
          </center>
        </div>
        {edit ? <SetUserDetails user={user} /> : <UpdateUser user={user} check={check} setCheck ={setCheck}/>}
        <ChangePassword />
      </div>
    </div>
  );
};

const SetUserDetails = ({ user }) => {
  return (
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
              disabled
              className="form-control"
              placeholder={user.fullname}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <label className="labels">Mobile Number</label>
            <input
              type="text"
              disabled
              className="form-control"
              placeholder={user.phone}
            />
          </div>
          <div className="col-md-12">
            <label className="labels">Email ID</label>
            <input
              disabled
              type="text"
              className="form-control"
              placeholder={user.email}
            />
          </div>
          <div className="col-md-12">
            <label className="labels">Address</label>
            <input
              type="text"
              placeholder={user.address}
              disabled
              className="form-control"
            />
          </div>
        </div>
        <div className="mt-2 text-center">
          <button
            className="btn btn-primary profile-button"
            disabled
            type="button"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdateUser = ({ user,check,setCheck }) => {
  const { userid } = useSelector((state) => {
    return state.auth;
  });
  const initialValues = {
    fullname: user.fullname,
    phone: user.phone,
    address: user.address,
    email: user.email,
  };
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: async (values, action) => {
      const response = await axios.post(`users/updateuser/${userid}`, values);
      if (response.status === 200) {
        toast.success("User Updated");
        setCheck(!check)
      }
    },
  });
  return (
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
              value={values.fullname}
            />
            <span className="text-danger">{errors.fullname}</span>
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
              value={values.phone}
            />
            <span className="text-danger">{errors.phone}</span>
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
              value={values.email}
            />
            <span className="text-danger">{errors.email}</span>
          </div>
          <div className="col-md-12">
            <label className="labels">Address</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              className="form-control"
              placeholder="enter phone number"
              value={values.address}
            />
            <span className="text-danger">{errors.address}</span>
          </div>
          <div className="mt-2 text-center">
            <button
              onClick={handleSubmit}
              className="btn btn-primary profile-button"
              type="button"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChangePassword = () => {
  const { userid } = useSelector((state) => {
    return state.auth;
  });
  const initialValues = {
    oldpassword: "",
    newpassword: "",
    confirmpass: "",
  };
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: passwordSchema,
    onSubmit: async (values, action) => {
      values.id = userid;
      const response = await axios.put("users/updateuserpassword", values);
      if (response.status === 200) {
        toast.success("Password Changed");
      }
      action.resetForm();
    },
  });
  return (
    <div className="col-md-4">
      <div className="p-3 py-5">
        <div className="d-flex justify-content-between align-items-center experience">
          <span className="h5">Change Password</span>
        </div>
        <form>
          <div className="col-md-12">
            <label className="labels">Old Password</label>
            <input
              type="text"
              onChange={handleChange}
              name="oldpassword"
              className="form-control"
              placeholder="Old Password"
              value={values.oldpassword}
            />
            <span className="text-danger">{errors.oldpassword}</span>

            <label className="labels">New Password</label>
            <input
              type="text"
              onChange={handleChange}
              name="newpassword"
              className="form-control"
              placeholder="New Password"
              value={values.newpassword}
            />
            <span className="text-danger">{errors.newpassword}</span>

            <label className="labels">Confirm Password</label>
            <input
              type="text"
              onChange={handleChange}
              name="confirmpass"
              className="form-control"
              placeholder="Confirm Password"
              value={values.confirmpass}
            />
            <span className="text-danger">{errors.confirmpass}</span>
            <br />
            <button className="btn btn-info mt-2" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const passwordSchema = () =>
  object({
    oldpassword: string().required("Old Password is Required"),
    newpassword: string().required("New Password is Required"),
    confirmpass: string().when("newpassword", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: string().oneOf(
        [ref("newpassword")],
        "Confirm Passowrd didn't match with New Password"
      ),
    }),
  });

const userSchema = () =>
  object({
    fullname: string().required("Fullname is Required"),
    address: string().required("Address is Required"),
    phone: string().required("Phone Number is Required").min(10).max(10),
  });

export default Profile;
