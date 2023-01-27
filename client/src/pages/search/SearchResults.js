import axios from "../../config/axios";
import React, { useContext, useEffect, useState } from "react";
import "../../assets/search.css";
import { GlobalContext } from "../../context/GlobalContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cart.slice";

const Search = () => {
  const dispatch=useDispatch()
  const { query } = useContext(GlobalContext);
  const navigate=useNavigate()
  const [results, setResults] = useState([]);

  const handleAddToCart=(value)=>{
    dispatch(addToCart(value))
  }

  useEffect(() => {
    fetchSearch();
  }, [query]);

  const fetchSearch = async () => {
    const { data } = await axios.get(`product/searchproducts?search=${query}`);
    setResults(data.products);
  };
  const viewProduct=(id)=>{
    navigate("/product",{state:{id}})
  }

  return (
    <div className="container mt-4">
      <div>
        <h5>
          Results For: <span className="text-muted">{query}</span>
        </h5>
      </div>
      <div className="searchSection">
        <Row>
          {results.length > 0
            ? results.map((value) => {
                return (
                  <Col
                    className="produc"
                    key={value._id}>
                    <Card height="100%" style={{width:"14rem"}}>
                      <Card.Img
                        onClick={() => viewProduct(value._id)}
                        variant="top"
                        height="150px"
                        src={`http://localhost:8000/public/products/${value.image}`}
                      />
                      <Card.Body>
                        <Card.Title onClick={() => viewProduct(value._id)}>
                          {value.name}
                        </Card.Title>
                        <div className="cardSection">
                          <span>Buy</span>
                          <span
                            className="mx-2"
                            onClick={() => handleAddToCart(value)}
                          >
                            Add
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            : "No Product Found"}
        </Row>
      </div>
    </div>
  );
};

export default Search;
