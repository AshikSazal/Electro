import React from "react";

import front_page from "../../icons/demo.jpg";
import wave from "./wave.svg";
import MultiCarousel from "../Carousel/MultiCarousel";
import Facility from "../Facility/Facility";
import Button from "../../shared/FormElements/Button";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="front-image">
        <div>
          <img src={front_page} alt="" />
        </div>
        <div className="front-text">
          <h1>Get your best product</h1>
          <h3>Upto 30% Offer</h3>
          <h5>
            Lorem ipsum dolor sit amet,
            <br /> consectetur adipisicing elit.
          </h5>
          <Button>Read more</Button>
        </div>
      </div>

      <div className="wish">
        <img src={wave} alt="" />
        <div className="svg-text">
          <h1>Your wish, Our target</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. lorem
          </p>
        </div>
      </div>

      <MultiCarousel />
      <Facility />      
    </div>
  );
};

export default Home;
