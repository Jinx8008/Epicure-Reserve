import React from "react";
import Navbar from "../Components/Navbar";
import Carousel from "../Components/Carousel";
import ReservationForm from "../Components/ReservationForm";

const Home = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <ReservationForm />
      <h1>Hello World</h1>
    </>
  );
};

export default Home;
