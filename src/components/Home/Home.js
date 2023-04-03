import React from "react";

import front_page from "../../icons/demo.jpg";
import wave from "./wave.svg";
import MultiCarousel from "../Carousel/MultiCarousel";
import Element from "../Element/Element";
import "./Home.css";

const Home = () => {
  return (
    <>
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
          <button className="btn">Read more</button>
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
      <Element />
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, consequatur minima dolores maxime doloremque ab soluta non magnam quidem libero quam enim, iusto expedita id facere sunt quos praesentium illo.
        Porro enim quidem quod. Deleniti eum ex sunt voluptatibus, asperiores molestiae aliquid incidunt recusandae voluptate. Sed, amet officiis quos, ullam commodi ipsa autem nesciunt, nobis in quo quod cum possimus!
        Porro minima sequi, molestiae maiores eius alias adipisci incidunt, cum a expedita soluta ratione! Error in nobis optio cumque itaque, at id laborum amet aliquid et. Libero laudantium tempore expedita.
        Reiciendis id distinctio animi tenetur quam quisquam, consequatur exercitationem iure at alias. Fuga expedita nihil doloribus molestiae, nam quo reprehenderit aperiam quis vero animi. Laboriosam, perspiciatis praesentium. Cupiditate, eaque quos.
        Cum vero culpa necessitatibus ipsa quam eaque, nulla illum nobis delectus minima, porro sequi? Architecto aliquid, natus laudantium laboriosam minima quis illo distinctio sint laborum a ratione id, possimus molestias!
        Eos iusto esse ut aliquam saepe velit, beatae nobis nostrum debitis cumque ab reprehenderit recusandae in eveniet? Adipisci, at. Aperiam accusamus culpa sit blanditiis iure, fugiat eos facilis consequuntur commodi.
        Provident, odio? Dolor dolorum blanditiis commodi quos praesentium? Non distinctio sit libero, voluptas delectus, cumque aperiam vel modi tempore sunt laudantium nemo dolore assumenda laborum amet. Laborum blanditiis minima voluptate!
        Quasi officia, facilis ratione tempora rem error quos natus praesentium fuga vero. Iste similique quam odio vel fuga eaque! Enim libero aliquam eos animi veritatis quod maiores natus quaerat architecto.
        Dolores incidunt quos veritatis sequi, error alias deserunt voluptates optio rem cumque nostrum accusamus quam blanditiis! Quia maxime doloribus consequatur, reprehenderit corporis molestiae? Inventore laborum modi assumenda excepturi, aut possimus!
        Debitis voluptatibus unde, ipsum adipisci consequuntur, ut et nihil obcaecati quaerat sit id quas laudantium cumque, explicabo iusto? Nam quia dicta ratione quibusdam consequatur accusamus adipisci placeat? Veniam, molestias accusantium?
      </div>
      
    </>
  );
};

export default Home;
