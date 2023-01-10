import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "../../assets/deals.css";
import axios from "../../config/axios";
import sorter from "sort-nested-json";


const Discounts = () => {
  return (
    <section className="NewArrivals background">
      <div className="container">
        <div className="heading d_flex">
          <div className="heading-left row  f_flex">
            <h4>Top Discounts </h4>
          </div>
          <div className="heading-right row ">
            <span style={{cursor:"pointer"}}>View all</span>
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
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const { data } = await axios.get("product/getproducts");
    setProducts(data);
  };

  const viewProduct=(id)=>{
    navigate("/product",{state:{id}})
  }

  const sortedproducts=sorter.sort(products).desc("discount")


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: products.length<6?products.length:6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: products.length<5?products.length:5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
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
  return (
    <>
      <Slider {...settings}>
        {sortedproducts.map((value, id) => {
          return (
            <div
              key={id}
              onClick={() => viewProduct(value._id)}
              className="catecards m-1 p-1"
            >
              <div className="p-1" style={{ backgroundColor: "#034f84" }}>
                <img
                  height="150px"
                  width="100%"
                  src={`http://localhost:8000/public/products/${value.image}`}
                />
                <h5>{value.name}</h5>
                <label>${value.price}.00 &nbsp; {value.discount}%</label>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default Discounts;
