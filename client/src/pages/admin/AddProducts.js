import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { object, string, mixed, number } from "yup";
import { Form, Button } from "react-bootstrap";
import axios from "../../config/axios";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  price: "",
  category: "",
  model: "",
  brand: "",
  discount:"",
  image:""
};

const AddProducts = () => {
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchBrand = async () => {
      const { data } = await axios.get("brand/getbrand");
      setBrand(data);
    };
    const fetchCategory = async () => {
      const { data } = await axios.get("category/getcategory");
      setCategory(data);
    };
    fetchBrand();
    fetchCategory();
  }, []);


  const { values, handleChange, handleBlur,setFieldValue, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: addSchema,
    onSubmit: async (values, action) => {
      let formdata = new FormData();
      for (let key in values) {
        formdata.append(key, values[key]);
      }
      const response=await axios.post("/product/addproduct",formdata,{type:"true"})
      if(response.status===200){
        toast.success("Product Saved")
      }else{
        toast.warning("Some Error Occured")
      }
      action.resetForm();
    },
  });
  return (
    <div>
      <div className="text-center d-flex justify-content-center mt-4 mx-4">
        <Form encType="multipart/form-data">
          <h1>Add Product</h1>
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
              aria-label="Default select example"
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

          <div className="input-group input-group-lg">
            <Form.Control
              type="file"
              className="mt-2"
              name="image"
              required
              accept="image/*"
              onBlur={handleBlur}
              onChange={(e)=>setFieldValue("image", e.target.files[0])}
            />
          </div>
          <span className="text-danger">{errors.image}</span>

          <br />
          <Button type="submit" className="btn-lg mb-4" onClick={handleSubmit}>
            Add Product
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddProducts;

const addSchema = () =>
  object({
    name: string().required("Name is Required"),
    price: string().required("Price is Required"),
    category: string().required("Category is Required"),
    model: string().required("Model is Required"),
    brand: string().required("Brand is Required"),
    image: mixed().required("Image is required"),
    discount:number().required("Discount is Required")
  });
