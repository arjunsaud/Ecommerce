import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";
import { Input, Div, Form } from "../../styled/styled.components";
import { Button } from "../../styled/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object,ref, string } from "yup";
import axios from "../../config/axios";
import { toast } from "react-toastify";
const ChangePassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const initialValues = {
    password: "",
    confirmpass: "",
  };

  const [message,setMessage]=useState(false)

  const navigate=useNavigate()

  const { values, handleChange, handleBlur, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: passwordSchema,
    onSubmit: async (values, action) => {
      values.token=token
      const response = await axios.post("auth/changepassword", values);
      if (response.status === 200) {
        toast.success("Password Changed")
        navigate("/login")
      }else{
        setMessage(!message)
      }
      action.resetForm()
    },
  });

  return (
    <Wrapper>
      <Div>
        <Div>
          <h1>Change Password</h1>
          <Form>
            <label>Password</label>
            <Input
              type="text"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter New Password"
            />
            <span className="text-danger">{errors.password}</span>
            <label>Confirm Password</label>
            <Input
              type="text"
              name="confirmpass"
              value={values.confirmpass}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Confirm New Password"
            />
            <span className="text-danger">{errors.confirmpass}</span>
            <Button
              type="submit"
              style={{ marginLeft: "25px" }}
              onClick={handleSubmit}
            >
              Send
            </Button>
          </Form>
          <span className="text-success h5">
            {message ? "Reset Link is Expired" : ""}
          </span>
        </Div>
      </Div>
    </Wrapper>
  );
};

export default ChangePassword;

const passwordSchema = () =>
  object({
    password: string().required("Email is Required"),
    confirmpass:string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: string().oneOf(
        [ref("password")],
        "Confirm Passowrd didn't match with Password"
      ),
    }),
  });

const Wrapper = styled.section`
  label {
    margin-top: 10px;
    margin-left: 10px;
  }
  span {
    margin-left: 10px;
  }
`;
