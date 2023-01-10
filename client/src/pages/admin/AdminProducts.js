import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "../../config/axios";
import Pagination from "react-bootstrap/Pagination";

import { toast } from "react-toastify";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const { data } = await axios.get("product/getproducts");
    setProducts(data);
  };
  const handleDelete = async (id) => {
    const response = await axios.delete(`product/deleteproduct/${id}`);
    fetchProducts();
    if (response.status === 200) {
      toast.success("Deleted");
    } else {
      toast.warning("Some Error Occured");
    }
  };

  const handleEdit = (value) => {
    navigate("/admin/editproduct", { state:{value } });
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
    <Wrapper>
      <div>
        <Link to="/admin/addproduct" className="btn btn-primary m-4">
          Add Product
        </Link>
        <div className="m-4">
          <h4>Products List</h4>
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
                <th colSpan={2}>Action</th>
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
                      <td className="text-center">
                        <button
                          className="btn btn-warning mb-1"
                          onClick={() => handleEdit(value)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => handleDelete(value._id)}
                        >
                          Delete
                        </button>
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
    </Wrapper>
  );
};

export default AdminProducts;

const Wrapper = styled.section``;
