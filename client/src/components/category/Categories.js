import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";

const Categories = () => {
  const [category, setCategory] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    const { data } = await axios.get("category/getcategory");
    const dt = data.slice(0, 8);
    setCategory(dt);
  };
  const goToProductbyCateogry = (value) => {
    navigate("/productsbycategory", { state: { value } });
  };
  return (
    <div className="category m-4">
      <span className="mx-4 f_flex h5">Categories</span>
      {category.length > 0 ? (
        category.map((value) => {
          return (
            <div className="box f_flex" onClick={()=>goToProductbyCateogry(value.category)} key={value._id}>
              <span>{value.category}</span>
            </div>
          );
        })
      ) : (
        <center>No Category</center>
      )}
    </div>
  );
};

export default Categories;
