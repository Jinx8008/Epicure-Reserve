import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Carousel from "../Components/Carousel";
import Stats from "../Components/Stats";
import ReservationForm from "../Components/ReservationForm";
import MenuPreview from "../pages/MenuPreview";
import Gallery from "../Components/MiniGallery";
import Blog from "./Blog";
import CommentsDisplay from "../Components/CommentsDisplay";
import Footer from "../Components/Footer";
import './Home.css';

const Home = () => {
  // 🔹 State to hold latest comment
  const [newComment, setNewComment] = useState(null);

  return (
    <>
      <Navbar />
      <Carousel />
      <Stats />
      <section id="reservation">
        <ReservationForm />
      </section>
      <MenuPreview />
      <Gallery />
      <Blog />

      <CommentsDisplay newComment={newComment} />

      <Footer onNewComment={setNewComment} />
    </>
  );
};

export default Home;
