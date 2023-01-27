import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../../assets/deals.css"
import { useDispatch } from "react-redux";
import axios from "../../config/axios";
import { addToCart } from "../../slices/cart.slice";
import { useNavigate } from "react-router-dom";

const ForYou = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const { data } = await axios.get("product/getproducts");
    const dt=data.slice(0,30)
    setProducts(dt);
  };
  const handleAddToCart=(value)=>{
    dispatch(addToCart(value))
  }

  const handleGoBuy=(value)=>{
    dispatch(addToCart(value))
    navigate("/cart")
  }

  const viewProduct=(id)=>{
    navigate("/product",{state:{id}})
  }

  return (
    <Container className="my-4">
      <h4 className="mb-4">Recommended For You</h4>
      <Row height="200px">
        {products.length > 0
          ? products.map((value) => {
              return (
                <Col className="produc"  key={value._id}>
                  <Card height="100%" style={{width:"13rem"}}>
                    <Card.Img onClick={()=>viewProduct(value._id)}
                      variant="top"
                      height="150px"
                      src={`http://localhost:8000/public/products/${value.image}`}
                    />
                    <Card.Body>
                      <Card.Title onClick={()=>viewProduct(value._id)}>{value.name}</Card.Title>
                      <div className="cardSection">
                        <span onClick={()=>handleGoBuy(value)}>Buy</span>
                        <span className="mx-2" onClick={()=>handleAddToCart(value)}>Add</span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          : "No Products"}
      </Row>
    </Container>
  );
};

export default ForYou;
