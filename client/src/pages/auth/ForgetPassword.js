import React, { useState } from "react";
import styled from "styled-components";
import { Input, Div, Form } from "../../styled/styled.components";
import { Button } from "../../styled/Button";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "../../config/axios";

const ForgetPassword = () => {
  const initialValues = {
    email: "",
  };

  const [message, setMessage] = useState(false);

  const { values, handleChange, handleBlur, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: emailSchema,
    onSubmit: async (values, action) => {
      const response = await axios.post("auth/forgetpassword", values);
      if (response.status === 200) {
        setMessage(!message);
      }
      action.resetForm()
    },
  });
  return (
    <Wrapper>
      <Div>
        <Div>
          <h1>Reset Password</h1>
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
            <Button
              type="submit"
              style={{ marginLeft: "25px" }}
              onClick={handleSubmit}
            >
              Send Password Reset Link
            </Button>
          </Form>
          <span className="text-success h5">
            {message ? "Password Reset Link Sent to Your Email" : ""}
          </span>
        </Div>
      </Div>
    </Wrapper>
  );
};

const emailSchema = () =>
  object({
    email: string().required("Email is Required"),
  });

export default ForgetPassword;

const Wrapper = styled.section`
  label {
    margin-top: 10px;
    margin-left: 10px;
  }
  span {
    margin-left: 10px;
  }
`;
