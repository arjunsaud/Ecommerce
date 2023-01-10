import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { object, string, mixed } from "yup";
import Table from "react-bootstrap/Table";
import axios from "../../config/axios";
import { toast } from "react-toastify";

const Specs = () => {
  return (
    <Wrapper>
      <div className="spec">
      <div className="addsection">
        <AddBrand />
        <AddCategory />
      </div>
      <hr/>
      <div className="listsection">
        <ListBrand />
        <ListCategory />
      </div>
      </div>
    </Wrapper>
  );
};
export default Specs;


const AddBrand = () => {

  const { values, handleChange, handleBlur, handleSubmit, errors } = useFormik({
    initialValues:{
      brand:""
    },
    validationSchema: brandSchema,
    onSubmit: async (values, action) => {
      const response=await axios.post("brand/addbrand",values)
      if(response.status===200){
        toast.success("Brand Saved")
      }else{
        toast.warning("Some Error Occured")
      }
      action.resetForm();
    },
  });

  return (
    <div className="m-3">
      <span className="text-danger">{errors.brand}</span>
      <Form.Control className="input-lg mb-2" name="brand" value={values.brand} onChange={handleChange} onBlur={handleBlur} required placeholder="Add Brand" />
      <Button
        onClick={handleSubmit}
      >
        Add
      </Button>
    </div>
  );
};

const AddCategory = () => {
  const { values, handleChange, handleBlur,setFieldValue, handleSubmit, errors } = useFormik({
    initialValues:{
      category:"",
      image:""
    },
    validationSchema: categorySchema,
    onSubmit: async (values, action) => {
      let formdata = new FormData();
      for (let key in values) {
        formdata.append(key, values[key]);
      }
      console.log(formdata);
      const response=await axios.post("category/addcategory",formdata,{type:"true"})
      if(response.status===200){
        toast.success("Category Saved")
      }else{
        toast.warning("Some Error Occured")
      }
      action.resetForm();
    },
  });

  return (
    <div className="m-3">
      <span className="text-danger">{errors.category}</span>
      <Form.Control name="category" value={values.category} className="mb-2" onBlur={handleBlur} onChange={handleChange} required placeholder="Add Category" />
      <span className="text-danger">{errors.image}</span>
      <Form.Control type="file" name="image" className="mb-2" onBlur={handleBlur} onChange={(e)=>setFieldValue("image", e.target.files[0])} required placeholder="Add Category" />
      <Button onClick={handleSubmit}>
        Add
      </Button>
    </div>
  );
};

const ListBrand = () => {

  const [brand, setBrand] = useState([]);
  useEffect(() => {
    fetchBrand();
  }, []);
  const fetchBrand = async () => {
    const { data } = await axios.get("brand/getbrand");
    setBrand(data);
  };

  const handleDelete=async(id)=>{
    const response = await axios.delete(`brand/deletebrand/${id}`);
    if(response.status===200){
      toast.success("Brand Deleted")
      fetchBrand()
    }
    else{
      toast.warning("Some Error Occured")
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = brand.slice(firstPostIndex, lastPostIndex);

  let items = [];
  for (let i = 1; i <= Math.ceil(brand.length / postsPerPage); i++) {
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
      <h3>Brand Lists</h3>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Brand Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.length > 0 ? (
            currentPosts.map((value) => {
              return (
                <tr key={value._id}>
                  <td>{value.brand}</td>
                  <td>
                    <button className="btn btn-danger" onClick={()=>handleDelete(value._id)}>Delete</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No Brand</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination>{items}</Pagination>
    </div>
  );
};

const ListCategory = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = async () => {
    const { data } = await axios.get("category/getcategory");
    setCategory(data);
  };

  const handleDelete=async(id)=>{
    const response = await axios.delete(`category/deletecategory/${id}`);
    if(response.status===200){
      toast.success("Category Deleted")
      fetchCategory()
    }
    else{
      toast.warning("Some Error Occured")
    }
  }


  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 7;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = category.slice(firstPostIndex, lastPostIndex);

  let items = [];
  for (let i = 1; i <= Math.ceil(category.length / postsPerPage); i++) {
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
      <h3>Category Lists</h3>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.length > 0 ? (
            currentPosts.map((value) => {
              return (
                <tr key={value._id}>
                  <td>{value.category}</td>
                  <td>
                    <button className="btn btn-danger" onClick={()=>handleDelete(value._id)}>Delete</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No Category</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination>{items}</Pagination>

    </div>
  );
};

const brandSchema = () =>
  object({
    brand: string().required("Brand is Required"),
  });

  const categorySchema = () =>
  object({
    category: string().required("Category is Required"),
    image: mixed().required("Image is Required"),
  });


const Wrapper = styled.section`

.spec{
  display:flex;
  flex-direction:column;
  justify-content: space-between;
}
  .addsection {
    display: flex;
    justify-content: space-between;
    flex-warp: warp;
  }
  .listsection {
    display: flex;
    justify-content: space-around;
    flex-warp: warp;
  }
`;
