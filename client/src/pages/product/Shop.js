import axios from "../../config/axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();

  const { userid } = useSelector((state) => {
    return state.auth;
  });

  useEffect(() => {
    fetchProducts();
    // fetchReviews()
  }, []);

  const [product, setProduct] = useState([]);
  // const [review, setReview] = useState([]);


  const fetchProducts = async () => {
    if (userid) {
      const { data } = await axios.get(`buy/getbuy/${userid}`);
      setProduct(data[0].products);
    }
  };

  // const fetchReviews=async()=>{
  //   if (userid) {
  //     const { data } = await axios.get(`buy/getbuy/${userid}`);
  //     setProduct(data[0].products);
  //   }  }

  const handleClick = (value) => {
    navigate("/review", {
      state: {
        value,
      },
    });
  };

  const handleGo = (id) => {
    navigate("/product", { state: { id } });
  };

  return (
    <div className="mt-2">
      {product.length > 0 ? (
        product.map((value) => {
          return (
            <Card key={value._id} style={{ width: "30rem" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div
                    className="d-flex"
                    role="button"
                    onClick={() => handleGo(value._id)}
                  >
                    <img
                      style={{ padding: "1px" }}
                      className="bg-dark"
                      height="100px"
                      width="100px"
                      src={`http://localhost:8000/public/products/${value.image}`}
                    />
                    <div className="d-flex row mt-1 mx-1">
                      <span>{value.name}</span>
                      <span>${value.price}</span>
                      <span>{value.brand}</span>
                    </div>
                  </div>
                  <div className="text-danger">Delivery Details</div>
                  <span>{value.fullname}</span> / <span>{value.email}</span> /{" "}
                  <span>{value.address}</span>
                </ListGroup.Item>
                <button
                  onClick={() => handleClick(value)}
                  className="btn btn-info"
                >
                  Write a Review
                </button>
              </ListGroup>
            </Card>
          );
        })
      ) : (
        <Card style={{ width: "30rem" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>No Products</ListGroup.Item>
          </ListGroup>
        </Card>
      )}
    </div>
  );
};

export default Shop;
