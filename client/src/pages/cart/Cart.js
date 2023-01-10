import React, { useEffect, useState } from "react";
import "../../assets/cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseCartItem,
  decreaseCartItem,
} from "../../slices/cart.slice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => {
    return state.cart;
  });

  const [total,setTotal]=useState(0)
  useEffect(()=>{
    countTotal()
  },[cart])
  
  const countTotal=()=>{
    let tall=0
    cart.forEach(data => {
      const tind=data.price*data.qty 
      tall=tall+tind
    });
    setTotal(tall)
  }

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
    <section>
      <div className="card">
        <div className="row m-2">
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
            {
              cart.length>0?cart.map((value)=>{
                return(
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
                      <button className="decbtn" onClick={()=>decreaseItem(value._id,value.qty)}>-</button>
                      <label className="lists">{value.qty}</label>
                      <button className="incbtn" onClick={()=>increaseItem(value._id)}>+</button>
                    </div>
                    <div className="col">
                      <span className="col">&euro; {value.qty*value.price}</span>
                    </div>
                    <div className="col">
                      <span className="close" onClick={()=>removeItem(value._id)} style={{ fontSize: "20px" }}>
                        &#10005;
                      </span>
                    </div>
                  </div>
                </div>
                )
              }):"No items"
            }

            <div className="back-to-shop" style={{ cursor: "pointer" }}>
              <span className="text-muted text-white">
                <label style={{ fontSize: "30px" }}>&#8592;</label> Back to shop
              </span>
            </div>
          </div>
          <div className="col-md-4 summary">
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
            <button className="btn btn-success">CHECKOUT</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
