import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "../../assets/deals.css"
import axios from "../../config/axios"
import Card from "react-bootstrap/Card";


const TopCategories = () => {
  return (
    <section className="NewArrivals background">
      <div className="container">
        <div className="heading d_flex">
          <div className="heading-left row  f_flex">
            <h4>Top Categories </h4>
          </div>
          <div className="heading-right row ">
            <span>View all</span>
          </div>
        </div>
      </div>
      <div className="container">
        <Cards />
      </div>
    </section>
  );
};

const Cards = () => {
  const navigate=useNavigate()
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = async () => {
    const { data } = await axios.get("category/getcategory");
    setCategory(data);
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const goToProductbyCateogry=(value)=>{
    navigate("/productsbycategory",{state:{value}})
  }
  return (
    <>
      <Slider {...settings}>
        {category.map((value) => {
          return (
            <div onClick={()=>goToProductbyCateogry(value.category)} key={value._id} className="catecards m-2 p-1">
              <Card height="100%" style={{width:"12rem"}}>
                <Card.Img
                  variant="top"
                  height="140px"
                  src={`http://localhost:8000/public/category/${value.image}`}
                />
                <Card.Body>
                  <Card.Title>
                    {value.name}
                  </Card.Title>
                  <label>{value.category}</label>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default TopCategories;
