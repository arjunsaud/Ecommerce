import axios from "../../config/axios";
import React, { useContext, useEffect, useState } from "react";
import "../../assets/search.css";
import { GlobalContext } from "../../context/GlobalContext";

const Search = () => {
  const { query } = useContext(GlobalContext);

  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchSearch();
  }, []);

  const fetchSearch = async () => {
    const { data } = await axios.get(`product/searchproducts?search=${query}`);
    setResults(data.products);
  };

  return (
    <div className="container mt-4">
      <div>
        <h5>
          Results For: <span className="text-muted">{query}</span>
        </h5>
      </div>
      <div className="searchSection">
        <div>
          {results.length > 0
            ? results.map((value) => {
                return (
                  <div key={value._id} className="productlists">
                    <div className="product">
                      <div className="productimage">
                        <img
                          src="https://img.freepik.com/free-photo/pink-headphones-wireless-digital-device_53876-96804.jpg"
                          alt="productimg"
                        />
                      </div>
                      <div className="productdeatils">
                        <h5>{value.name}</h5>
                        <span>${value.price}</span>
                        <div className="buttonsection">
                          <button className="buy">Buy</button>
                          <button className="addtocart">Add to Cart</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : "No Match Found"}
        </div>
      </div>
    </div>
  );
};

export default Search;
