import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Button } from "../../styled/Button";
import axios from "../../config/axios";
import "../../assets/slider.css"


const SliderHome = () => {
  const [offer, setOffer] = useState([]);

  useEffect(() => {
    fetchOffer();
  }, []);

  const fetchOffer = async () => {
    const { data } = await axios.get("offer/getoffer");
    setOffer(data);
  };

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <section className="homeSlide contentWidth my-4 mx-3">
      <div className="container">
        <Slider {...settings} className="slider">
          {offer.map((value, index) => {
            return (
              <div key={index} className="box offer_slider d_flex p-4">
                <div className="left offer_card">
                  <h2>{value.title}</h2>
                  <p>{value.desc}</p>
                  <Button>Visit</Button>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default SliderHome;
