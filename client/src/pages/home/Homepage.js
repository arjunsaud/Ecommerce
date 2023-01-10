import React from "react";
import "../../assets/Homepage.css";
import Categories from "../../components/category/Categories";
import SliderHome from "../../components/slider/Slider";
import NewArrivals from "../../components/deals/NewArrivals";
import Discounts from "../../components/deals/Discounts";
import TopCategories from "../../components/deals/TopCategories";
import ForYou from "../../components/deals/ForYou"
const Homepage = () => {
  return (
    <section className="home">
      <div className="container d_flex">
        <Categories />
        <SliderHome />
      </div>
      <NewArrivals />
      <Discounts/>
      <TopCategories/>
      <ForYou/>
    </section>
  );
};

export default Homepage;
