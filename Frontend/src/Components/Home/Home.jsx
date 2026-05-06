import React from "react";
import Header from "./header";
import Sentiment from "../Sentiment/Sentiment";
import Possibility from "./Possibility/Possibility";
import Blog from "./Blog";
import Disclaimer from "./Disclaimer";
import News from "../News/News";

const Home = () => {
  return (
    <>
      <div id="home">
        <Header />
      </div>

      <div id="sentiment">
        <Sentiment />
      </div>

      <Possibility />

      <div id="cards">
        <News />
      </div>

      <Blog />
      <Disclaimer />
    </>
  );
};

export default Home;