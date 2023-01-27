import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "../../config/axios";
import Pagination from "react-bootstrap/Pagination";

const BuyProducts = () => {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const { data } = await axios.get(`buy/getbuy/${state.id}`);
    setProducts(data[0].products);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex);

  let items = [];
  for (let i = 1; i <= Math.ceil(products.length / postsPerPage); i++) {
    items.push(
      <Pagination.Item
        key={i}
        onClick={() => setCurrentPage(i)}
        active={i === currentPage}
      >
        {i}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <div className="m-4">
        <h4>Products Sold List</h4>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.length > 0 ? (
              currentPosts.map((value, index) => {
                return (
                  <tr key={value._id}>
                    <td>{index + 1}</td>
                    <td>{value.name}</td>
                    <td>{value.price}</td>
                    <td>{value.category}</td>
                    <td>{value.brand}</td>
                    <td>{value.model}</td>
                    <td>
                      <img
                        height="50px"
                        width="50"
                        src={`http://localhost:8000/public/products/${value.image}`}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>No Products</td>
              </tr>
            )}
          </tbody>
        </Table>
        <Pagination>{items}</Pagination>
      </div>
    </div>
  );
};

export default BuyProducts;
