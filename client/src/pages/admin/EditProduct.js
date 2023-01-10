import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { object, string, mixed, number } from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import styled from "styled-components";

const EditProducts = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState(state.value);


  const [viewImg,setViewImg]=useState(state.value.image)

  useEffect(() => {
    fetchBrand();
    fetchCategory();
  }, []);
  const fetchBrand = async () => {
    const { data } = await axios.get("brand/getbrand");
    setBrand(data);
  };
  const fetchCategory = async () => {
    const { data } = await axios.get("category/getcategory");
    setCategory(data);
  };

  const {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      name: product.name,
      price: product.price,
      category: product.category,
      model: product.model,
      discount: product.discount,
      brand: product.brand,
      image: product.image,
    },
    validationSchema: editSchema,
    onSubmit: async (values, action) => {
      if (product.image === "") {
        let formdata = new FormData();
        for (let key in values) {
          formdata.append(key, values[key]);
        }
        const response = await axios.put(
          `product/editproducti/${product._id}`,
          formdata,
          {
            type: "true",
          }
        );
        if (response.status === 200) {
          toast.success("Product Updated");
        } else {
          toast.warning("Some Error Occured");
        }
        navigate("/admin/products");
      } else {
        const response = await axios.put(`product/editproduct/${product._id}`, values);
        if (response.status === 200) {
          toast.success("Product Updated");
        } else {
          toast.warning("Some Error Occured");
        }
        navigate("/admin/products");
      }
    },
  });

  const deleteImage = async (name, id) => {
    const resp = await axios.delete(`product/deleteimage/${name}/${id}`);
    if (resp.status === 200) {
      toast.success("Image Deleted");
      setViewImg("")
    }
  };

  return (
    <div>
      <div className="text-center d-flex justify-content-center mt-4 mx-4">
        <Form encType="multipart/form-data">
          <h1>Update Product</h1>
          <div className="input-group input-group-lg">
            <Form.Control
              type="text"
              className="mt-4"
              value={values.name}
              name="name"
              onBlur={handleBlur}
              placeholder="Product Name"
              onChange={handleChange}
            />
          </div>
          <span className="text-danger">{errors.name}</span>

          <br />
          <div className="input-group input-group-lg">
            <Form.Control
              type="text"
              className="mt-2"
              value={values.price}
              name="price"
              placeholder="Product Price"
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <span className="text-danger">{errors.price}</span>
          <br />

          <div className="input-group input-group-lg">
            <Form.Control
              type="text"
              className="mt-2"
              value={values.model}
              name="model"
              placeholder="Product Model"
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <span className="text-danger">{errors.model}</span>
          <br />

          <div className="input-group input-group-lg">
            <Form.Control
              type="number"
              className="mt-2"
              value={values.discount}
              name="discount"
              placeholder="Discount in (0-100) Percentage"
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <span className="text-danger">{errors.discount}</span>
          <br />

          <div className="input-group input-group-lg">
            <Form.Select
              aria-label="Default select example"
              onBlur={handleBlur}
              name="brand"
              value={values.brand}
              onChange={handleChange}
            >
              <option>Select Brand</option>
              {brand.map((value) => {
                return (
                  <option key={value._id} value={value.brand}>
                    {value.brand}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <span className="text-danger">{errors.brand}</span>
          <br />

          <div className="input-group input-group-lg">
            <Form.Select
              onBlur={handleBlur}
              name="category"
              value={values.category}
              onChange={handleChange}
            >
              <option>Select Category</option>
              {category.map((value) => {
                return (
                  <option key={value._id} value={value.category}>
                    {value.category}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <span className="text-danger">{errors.category}</span>
          <br />
          {viewImg !== "" ? (
            <Wrapper>
              <div className="image-area">
                <img
                  src={`http://localhost:8000/public/products/${values.image}`}
                  alt="Preview"
                />
                <span
                  className="remove-image"
                  onClick={() => deleteImage(values.image, product._id)}
                  style={{ display: "inline", cursor: "pointer" }}
                >
                  &#215;
                </span>
              </div>
            </Wrapper>
          ) : (
            <div>
              <div className="input-group input-group-lg">
                <Form.Control
                  type="file"
                  name="image"
                  required
                  accept="image/*"
                  onBlur={handleBlur}
                  onChange={(e) => setFieldValue("image", e.target.files[0])}
                />
              </div>
              <span className="text-danger">{errors.image}</span>
            </div>
          )}
          <br />
          <Button type="submit" className="btn-lg mb-4" onClick={handleSubmit}>
            Update Product
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditProducts;

const editSchema = () =>
  object({
    name: string().required("Name is Required"),
    price: string().required("Price is Required"),
    category: string().required("Category is Required"),
    model: string().required("Model is Required"),
    brand: string().required("Brand is Required"),
    image: mixed().required("Image is required"),
    discount: number().required("Discount is Required"),
  });

const Wrapper = styled.section`
  body {
    padding: 20px;
  }
  .image-area {
    position: relative;
    width: 50%;
    background: #333;
  }
  .image-area img {
    width: 100%;
    height: 150px;
  }
  .remove-image {
    display: none;
    position: absolute;
    top: -10px;
    right: -10px;
    border-radius: 10em;
    padding: 2px 6px 3px;
    text-decoration: none;
    font: 700 21px/20px sans-serif;
    background: #555;
    border: 3px solid #fff;
    color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.3);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    -webkit-transition: background 0.5s;
    transition: background 0.5s;
  }
  .remove-image:hover {
    background: #e54e4e;
    padding: 3px 7px 5px;
    top: -11px;
    right: -11px;
  }
  .remove-image:active {
    background: #e54e4e;
    top: -10px;
    right: -11px;
  }
`;
