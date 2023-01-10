import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../../config/axios";
import { useLocation } from "react-router-dom";
import { addToCart } from "../../slices/cart.slice";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const { state } = useLocation();
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();


  const handleAddToCart=(value)=>{
    dispatch(addToCart(value))
  }
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const { data } = await axios.get(`product/getproduct/${state.id}`);
    setProduct(data.product);
  };

  return (
    <Wrapper>
      <div className="app">
        {product.map((value) => (
          <div className="details" key={value._id}>
            <div className="big-img">
              <img
                src={`http://localhost:8000/public/products/${value.image}`}
                alt=""
              />
            </div>

            <div className="box">
              <div className="row">
                <h2>{value.name}</h2>
                <span>${value.price}</span>
                <label><label className="text-muted">Brand :</label> <span className="text-white">{value.brand}</span></label>
                <label><label className="text-muted">Model :</label> <span className="text-white">{value.model}</span></label>
                <label><label className="text-muted">Category :</label> <span className="text-white">{value.category}</span></label>
              </div>
              <h5 className="text-muted">Images</h5>
              <DetailsThumb image={value.image} />
              <button className="btn btn-danger">Buy</button>
              <button className="btn btn-info mx-2" onClick={()=>handleAddToCart(value)}>Add to cart</button>

            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default ProductDetails;

const DetailsThumb = ({ image }) => {
  return (
    <div className="thumb">
      <img src={`http://localhost:8000/public/products/${image}`} alt="" />
    </div>
  );
};

const Wrapper = styled.section`
  .app {
    max-width: 1200px;
    width: 100%;
    margin: 100px auto;
    background: linear-gradient(90deg, rgba(157,25,159,1) 0%, rgba(113,4,73,1) 35%, rgba(6,67,120,1) 100%);   .details {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 30px 0;
  }
  .details .big-img {
    max-width: 500px;
    min-width: 290px;
    overflow: hidden;
    margin: 25px;
  }
  .big-img img {
    width: 100%;
    height: 100%;
    max-height: 400px;
    display: block;
    object-fit: cover;
  }

  .details .box {
    max-width: 500px;
    min-width: 290px;
    margin: 25px;
  }
  .box .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .box .row h2 {
    text-transform: uppercase;
    letter-spacing: 2px;
    color:white;
  }
  .box .row span {
    color: crimson;
  }
  .box .colors button {
    width: 30px;
    height: 30px;
    border: 1px solid #333;
    outline: none;
    margin-right: 5px;
    cursor: pointer;
  }
  .box p {
    line-height: 1.5;
    margin: 15px 0;
  }
  .thumb {
    width: 100%;
    height: 100px;
    display: flex;
    cursor: pointer;
    margin: 10px 0;
  }
  .thumb img {
    width: 90px;
    height: 100%;
    display: block;
    object-fit: cover;
    border: 1px solid #ddd;
    margin-right: 5px;
    opacity: 0.7;
    border-radius: 5px;
  }
  .thumb img.active {
    opacity: 1;
    border: 1px solid lightseagreen;
  }
  .box .cart {
    background: #333;
    color: white;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 10px 25px;
    margin-top: 15px;
  }

  @media (max-width: 500px) {
    .thumb {
      height: 50px;
    }
    .thumb img {
      width: 50px;
    }
  }
`;
