import React, { useEffect, useState } from "react";
import "../../assets/cart.css";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "../../config/axios";

import {
  removeFromCart,
  increaseCartItem,
  decreaseCartItem,
  clearCart
} from "../../slices/cart.slice";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [total, setTotal] = useState(0);
  const [checkout, setCheckout] = useState(true);
  const { role } = useSelector((state) => {
    return state.auth;
  });
  useEffect(()=>{
    if(role!=="user"){
      navigate("/login")
      dispatch(clearCart())
    }
  },[])
  return (
    <section>
      <div className="card mt-2">
        <div className="row m-2">
          {checkout ? <CartProduct setTotal={setTotal} /> : <CheckOut />}
          <div className="col-md-4 h-auto summary">
            <div>
              <h5>
                <b>Summary</b>
              </h5>
            </div>
            <div
              className="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}
            >
              <div className="col">TOTAL PRICE</div>
              <div className="col text-right">${total}.00</div>
            </div>
            {checkout ? (
              <button
                onClick={() => setCheckout(!checkout)}
                className="btn btn-success"
              >
                CHECKOUT
              </button>
            ) : (
              <button
                onClick={() => setCheckout(!checkout)}
                className="btn btn-danger"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const CartProduct = ({ setTotal }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => {
    return state.cart;
  });

  useEffect(() => {
    countTotal();
  }, [cart]);

  const countTotal = () => {
    let tall = 0;
    cart.forEach((data) => {
      const tind = data.price * data.qty;
      tall = tall + tind;
    });
    setTotal(tall);
  };

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const increaseItem = (id) => {
    dispatch(increaseCartItem(id));
  };
  const decreaseItem = (id, qty) => {
    if (qty > 1) {
      dispatch(decreaseCartItem(id));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <div className="col-md-8 cart">
      <div className="title">
        <div className="row">
          <div className="col">
            <h4>
              <b>Shopping Cart</b>
            </h4>
          </div>
          <div className="col align-self-center text-right text-muted">
            {cart.length} items
          </div>
        </div>
      </div>
      {cart.length > 0
        ? cart.map((value) => {
            return (
              <div key={value._id} className="row border-top border-bottom">
                <div className="row main align-items-center">
                  <div className="col-2">
                    <img
                      className="imge img-fluid"
                      src={`http://localhost:8000/public/products/${value.image}`}
                    />
                  </div>
                  <div className="col">
                    <div className="row text-muted">{value.category}</div>
                    <div className="row">{value.name}</div>
                  </div>
                  <div className="col btns">
                    <button
                      className="decbtn"
                      onClick={() => decreaseItem(value._id, value.qty)}
                    >
                      -
                    </button>
                    <label className="lists">{value.qty}</label>
                    <button
                      className="incbtn"
                      onClick={() => increaseItem(value._id)}
                    >
                      +
                    </button>
                  </div>
                  <div className="col">
                    <span className="col">
                      &euro; {value.qty * value.price}
                    </span>
                  </div>
                  <div className="col">
                    <span
                      className="close"
                      onClick={() => removeItem(value._id)}
                      style={{ fontSize: "20px" }}
                    >
                      &#10005;
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        : "No items"}

      <div className="back-to-shop" style={{ cursor: "pointer" }}>
        <Link to="/" className="text-muted text-white">
          Back to shop
        </Link>
      </div>
    </div>
  );
};

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const initialValues = {
    fullname: "",
    email: "",
    address: "",
  };
  const { cart } = useSelector((state) => {
    return state.cart;
  });
  const { userid } = useSelector((state) => {
    return state.auth;
  });

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: async (values, action) => {
      values.userid = userid;

        values.products = cart;

        const response = await axios.post("buy/addbuy", values);
        if(response.status===200){
          toast.success("Your Order is Placed")
          dispatch(clearCart())
          navigate("/shop")
        }
      action.resetForm();
    },
  });

  return (
    <div className="col-md-8 cart">
      <Card>
        <Card.Header>User Details</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="Text"
                name="fullname"
                onChange={handleChange}
                required
                value={values.fullname}
                placeholder="Full Name"
              />
              <Form.Label className="text-danger">
                {" "}
                {errors.fullname}
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                placeholder="email@example.com"
              />
              <Form.Label className="text-danger"> {errors.email}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label> Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                onChange={handleChange}
                required
                value={values.address}
                placeholder="Address"
              />
              <Form.Label className="text-danger"> {errors.address}</Form.Label>
            </Form.Group>
            <Button onClick={handleSubmit}>Place Order</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

const userSchema = () =>
  object({
    fullname: string().required("Fullname is Required"),
    email: string().required("Email is Required").email(),
    address: string().required("Address is Required"),
  });

export default Cart;
