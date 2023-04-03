import React from "react";

import front_page from "../../icons/demo.jpg";
import wave from "./wave.svg";
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
            ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis,
        maxime quos atque sit delectus temporibus pariatur architecto debitis.
        Quidem ipsam sed repudiandae amet sint ullam autem, alias nesciunt
        beatae dolorum! Dolores quasi possimus est iure voluptatem ullam
        aspernatur doloremque eligendi deserunt maxime consequuntur velit
        deleniti, rem adipisci hic ut, distinctio ipsam, sequi modi? Odit sunt
        adipisci aliquam ab, nulla laudantium! Repellendus, magni, aspernatur
        nobis, delectus nesciunt quidem laboriosam possimus tempore illo eius
        quisquam corrupti eveniet molestiae voluptatum esse minima consequuntur
        voluptatem animi quia doloribus laborum nam aliquid. Corporis, et qui.
        Officiis omnis aperiam nulla doloribus nemo a corrupti accusantium
        explicabo. Consequuntur necessitatibus, eligendi unde molestias alias
        modi atque nesciunt quibusdam quae quasi repellat, cupiditate nostrum.
        Nostrum commodi repudiandae blanditiis quos! Officiis fuga aspernatur
        illo soluta illum ipsum, recusandae adipisci placeat ducimus cum
        facilis, sequi tempore quis omnis dolor molestiae, expedita amet sunt
        quaerat pariatur voluptatum maxime cumque! Deserunt, esse alias!
        Voluptatem eos eveniet voluptates officiis expedita accusantium
        consequuntur provident cum quae doloremque in tempora, officia pariatur
        minus, nam deleniti vero. Id impedit non voluptas mollitia,
        reprehenderit sapiente error. Iste, dicta! Enim non repudiandae ad.
        Blanditiis vero sed officiis voluptatem minus fugit! Culpa doloribus
        officiis soluta sunt maxime. Saepe laboriosam incidunt voluptatum amet
        ipsa aliquam. Natus sunt necessitatibus harum itaque expedita? Tempora
        quaerat nobis ab consequuntur, distinctio quo cumque soluta perferendis
        non impedit necessitatibus doloremque enim nemo nisi totam minima
        deleniti id, vero eligendi in sint. Laudantium sequi iste a veritatis.
        Voluptates blanditiis odit veniam veritatis hic aspernatur facere. Nihil
        quae, quia omnis optio deleniti molestiae perspiciatis esse saepe veniam
        similique deserunt qui cupiditate, laboriosam quos, accusantium
        adipisci. Provident, amet alias. Accusamus, dicta aspernatur. Et,
        ducimus? Praesentium doloribus modi aliquid, inventore quaerat ut alias
        velit dolorem. Laboriosam blanditiis perferendis eligendi voluptas
        beatae illo reiciendis amet ab odio excepturi. Nisi, temporibus quo.
      </div>
    </>
  );
};

export default Home;
