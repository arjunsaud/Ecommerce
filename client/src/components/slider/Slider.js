import React from "react";
import Slider from "react-slick";
import {Button} from "../../styled/Button"

const SliderHome = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const Sdata = [
    {
      id: 1,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: "./images/SlideCard/slide-1.png",
    },
    {
      id: 2,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: "./images/SlideCard/slide-2.png",
    },
    {
      id: 3,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: "./images/SlideCard/slide-3.png",
    },
    {
      id: 4,
      title: "50% Off For Your First Shopping",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
      cover: "./images/SlideCard/slide-4.png",
    },
  ];
  return (
    <section className="homeSlide contentWidth my-4 mx-3">
      <div className="container">
      <Slider {...settings} className="slider">
        {Sdata.map((value, index) => {
          return (
            <div key={index}>
              <div className='box d_flex mt-4 p-4'>
                <div className='left'>
                  <h1>{value.title}</h1>
                  <p>{value.desc}</p>
                  <Button>Visit</Button>
                </div>
                <div className='right'>
                  <img src={value.cover} alt='' />
                </div>
              </div>
            </div>
          )
        })}
      </Slider> 
     </div>
    </section>
  );
};

export default SliderHome;
