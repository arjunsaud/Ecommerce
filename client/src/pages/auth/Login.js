import React from "react";
import styled from "styled-components";
import { Input, Div, Form } from "../../styled/styled.components";
import { Button } from "../../styled/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import api from "axios";
import { object, string } from "yup";
import axios from "../../config/axios";
import { useDispatch } from "react-redux";
import { setAuthDetails } from "../../slices/auth.slice";
import { setChatDetails } from "../../slices/chat.slice";


const url = "http://localhost:8001/";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleChange, handleBlur, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      const response = await axios.post("auth/login", { ...values });
      if (response.status === 200) {
        const resp = await api.post(url + "user/createuser", {
          userid: response.data.data.user._id,
          email: response.data.data.user.email,
          role: response.data.data.user.role,
        });
      }
      const user = {
        email: response.data.data.user.email,
        bearer_token: response.data.data.token,
        refresh_token: response.data.data.refreshToken,
        role: response.data.data.user.role,
        userid: response.data.data.user._id,
      };
      dispatch(setAuthDetails(user));
      if (response.status === 200) {
        if (response.data.data.user.role === "admin") {
          navigate("/admin");
        } else {
          const {data} = await api.get(url + "user/customersupport");
          dispatch(setChatDetails({adminuser:data.user.userid}))
          navigate("/");
        }
      }
      action.resetForm();
    },
  });
  return (
    <Wrapper>
      <Div>
        <Div>
          <h1>Login</h1>
          <Form>
            <label>Email</label>
            <Input
              type="email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Email"
            />
            <span className="text-danger">{errors.email}</span>
            <label>Password</label>
            <Input
              type="password"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              name="password"
              placeholder="Enter Password"
            />
            <span className="text-danger">{errors.password}</span>

            <Button type="submit" onClick={handleSubmit}>
              Login
            </Button>
          </Form>
          <center>Or</center>
          <Div>
            <button className="btn btn-primary">Login With Google</button>
          </Div>
          <hr />
          <center>
            Don't Have Account ? <Link to="/register">Register</Link>
          </center>
        </Div>
      </Div>
    </Wrapper>
  );
};

const loginSchema = () =>
  object({
    email: string().required("Email is Required"),
    password: string().required("Password is Required").min(4).max(32),
  });

export default Login;

const Wrapper = styled.section`
  label {
    margin-top: 10px;
    margin-left: 10px;
  }
  span {
    margin-left: 10px;
  }
`;
