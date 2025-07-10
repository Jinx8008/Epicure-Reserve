import React from "react";
import Navbar from "../Components/Navbar";
import Carousel from "../Components/Carousel";
import Stats from "../Components/Stats";
import ReservationForm from "../Components/ReservationForm";

const Home = () => {
  return (
    <>
      <Navbar />
      <Carousel />
        <Stats />
   
      
      <ReservationForm />
      <h1>Hello World</h1>
    </>
  );
};

export default Home;
