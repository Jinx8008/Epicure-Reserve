import React from "react";
import Navbar from "../Components/Navbar";
import Carousel from "../Components/Carousel";
import Stats from "../Components/Stats";
import ReservationForm from "../Components/ReservationForm";
import List from "../pages/List";
import Gallery from "../pages/Gallery";
import Blog from "./Blog";

const Home = () => {
  return (
    <>
      <Navbar />
      <Carousel />
        <Stats />
        <section id="reservation">
          <ReservationForm />
        </section>

      <List/>
      <Gallery/>
      <Blog />

      {/* Hero Section */}
      
      <h1>Hello World</h1>
    </>
  );
};

export default Home;
