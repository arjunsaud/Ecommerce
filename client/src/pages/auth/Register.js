import React from "react";
import { Input, Div, Form } from "../../styled/styled.components";
import { Button } from "../../styled/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string,ref } from "yup";
import styled from "styled-components";
import axios from "../../config/axios";

const initialValues = {
  email: "",
  password: "",
  fullname: "",
  address: "",
  phone: "",
  confirmpass: "",
};

const Register = () => {
  const navigate=useNavigate()
  const { values, handleChange, handleBlur, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      delete values["confirmpass"]
      const response = await axios.post("auth/register", {...values});
      if(response){
        navigate("/login")
      }      action.resetForm();
    },
  });
  return (
    <Wrapper>
      <Div>
        <Div>
          <h1>Register</h1>
          <Form>
            <label>Full Name</label>
            <Input
              type="text"
              name="fullname"
              value={values.fullname}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter Full Name"
            />
            <span className="text-danger">{errors.fullname}</span>

            <label>Email</label>
            <Input
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            <span className="text-danger">{errors.email}</span>

            <label>Address</label>
            <Input
              type="text"
              name="address"
              onBlur={handleBlur}
              value={values.address}
              onChange={handleChange}
              placeholder="Enter Address"
            />
            <span className="text-danger">{errors.address}</span>

            <label>Phone</label>
            <Input
              type="number"
              name="phone"
              onBlur={handleBlur}
              value={values.phone}
              onChange={handleChange}
              placeholder="Enter Phone"
            />
            <span className="text-danger">{errors.phone}</span>

            <label>Password</label>
            <Input
              type="password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              placeholder="Enter Password"
            />
            <span className="text-danger">{errors.password}</span>

            <label>Confirm Password</label>
            <Input
              type="password"
              name="confirmpass"
              onBlur={handleBlur}
              value={values.confirmpass}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            <span className="text-danger">{errors.confirmpass}</span>

            <Button primary type="submit" onClick={handleSubmit}>
              Register
            </Button>
            <center>Or</center>
            <Div>
              <button className="btn btn-primary">Register With Google</button>
            </Div>
            <hr />
            <center className="mb-4">
              Already Have Account ? <Link to="/login">Login</Link>
            </center>
          </Form>
        </Div>
      </Div>
    </Wrapper>
  );
};

const loginSchema = () =>
  object({
    fullname: string().required("Name is Required"),
    address: string().required("Address is Required"),
    phone: string().required("Phone Number is Required").min(10).max(10),
    email: string().required("Email is Required"),
    password: string().required("Password is Required").min(4).max(32),
    confirmpass: string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: string().oneOf(
        [ref("password")],
        "Confirm Passowrd didn't match with Password"
      ),
    }),
  });

export default Register;

const Wrapper = styled.section`
  label {
    margin-top: 10px;
    margin-left: 10px;
  }
  span {
    margin-left: 10px;
  }
`;
