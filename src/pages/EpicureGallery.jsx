import React, { useState, useEffect } from "react";
import { FaCommentDots, FaTrash, FaSave } from "react-icons/fa";
import Navbar from "../Components/Navbar";

const tabs = ["Regular", "VIP"];

const regularGallery = [
  {
    title: "Elegant Dining Room",
    img: "https://cdn.bluent.com/images/dining-room.webp",
    description: "A refined space for everyday dining.",
    tag: "Regular",
  },
  {
    title: "Exquisite Appetizers",
    img: "https://images.stockcake.com/public/5/5/5/5556ffd6-71d5-42eb-af3e-dd612578d50a_large/elegant-appetizer-serving-stockcake.jpg",
    description: "Delicious starters to whet your appetite.",
    tag: "Regular",
  },
  {
    title: "Gourmet Main Courses",
    img: "https://pulses.org/images/com_yoorecipe/422/cropped-moi-moi-rollup.jpg",
    description: "Carefully crafted entrées for every taste.",
    tag: "Regular",
  },
  {
    title: "Cozy Lounge Area",
    img: "https://dinesurf.com/wp-content/uploads/2024/11/Snapinsta.app_391616500_17892765245910946_2089713971528080196_n_1080-3.jpg",
    description: "Relax and unwind in comfort.",
    tag: "Regular",
  },
  {
    title: "Delectable Desserts",
    img: "https://i0.wp.com/www.afrolems.com/wp-content/uploads/2019/02/egusi-brittle-.jpg?resize=480%2C360&ssl=1",
    description: "Sweet endings to memorable meals.",
    tag: "Regular",
  },
  {
    title: "Chic Bar Setting",
    img: "https://livinspaces.net/wp-content/uploads/2024/08/Nature-Inspired-Lounge-Design-by-DHK-Design_11.jpg",
    description: "Trendy and modern cocktail bar area.",
    tag: "Regular",
  },
];

const vipGallery = [
  {
    title: "Private Dining Suite",
    img: "https://images.prismic.io/le-tete-dor/ZzzBY68jQArT1CoZ_LATETED%E2%80%99OR_WAGYUROOM_014FINALCreditJasonVarneyforRockwellGroup.jpg?auto=format%2Ccompress&fit=max&w=3840",
    description: "Luxury dining in a secluded space.",
    tag: "VIP",
  },
  {
    title: "Golden Plated Feast",
    img: "https://m.media-amazon.com/images/I/91zkzedtYcL._UF894,1000_QL80_.jpg",
    description: "Opulent meals fit for royalty.",
    tag: "VIP",
  },
  {
    title: "VIP Lounge",
    img: "https://pub-c3c5765215d14e3d882d51123be2ba44.r2.dev/media/images/diary/2025-04-28%2011%3A54%3A00.225849%2B00%3A00/.jpg",
    description: "Elegant and exclusive chill zone.",
    tag: "VIP",
  },
];

const EpicureGallery = () => {
  const [activeTab, setActiveTab] = useState("VIP");
  const [heroData, setHeroData] = useState(vipGallery[0]);
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem("galleryComments");
    return saved ? JSON.parse(saved) : {};
  });
  const [newComment, setNewComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [editing, setEditing] = useState(false);

  const isVIP = activeTab === "VIP";
  const galleryItems = isVIP ? vipGallery : regularGallery;

  useEffect(() => {
    setHeroData(galleryItems[0]);
  }, [activeTab]);

  const handleImageClick = (item) => {
    setHeroData(item);
    setNewComment("");
    setShowCommentInput(false);
    setEditing(false);
  };

  const handleCommentSave = () => {
    const updated = { ...comments, [heroData.img]: newComment };
    setComments(updated);
    localStorage.setItem("galleryComments", JSON.stringify(updated));
    setNewComment("");
    setShowCommentInput(false);
  };

  const handleCommentDelete = () => {
    const updated = { ...comments };
    delete updated[heroData.img];
    setComments(updated);
    localStorage.setItem("galleryComments", JSON.stringify(updated));
    setEditing(false);
    setShowCommentInput(false);
  };

  return (

    <>
    <Navbar/>
    <div className={`min-h-screen px-6 py-10 ${isVIP ? "bg-transparent text-white" : "bg-black text-white"}`}>
      <br />
      <br />
      <br />
      <br />
    
      <h2 className="font-bold text-4xl text-amber-400 mb-6 text-center">Gallery</h2> <br />

      <div className="flex flex-col md:flex-row gap-6 mb-10 items-start">
        <div className="flex-1 overflow-hidden rounded-xl">
          <img
            src={heroData.img}
            alt={heroData.title}
            className="w-full object-cover h-60"
          />
        </div>
        <div className="md:w-1/2 flex flex-col gap-2">
          <h3 className="text-xl font-semibold">{heroData.title}</h3>
          <p className="text-sm opacity-80">{heroData.description}</p>
          <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${heroData.tag === "VIP" ? "bg-transparent w-30 text-amber-400" : "w-30 text-amber-400"}`}>
            {heroData.tag}
          </span>
          <div className="mt-4">
            <button onClick={() => {
              setShowCommentInput(!showCommentInput);
              setEditing(false);
              setNewComment(comments[heroData.img] || "");
            }} className="flex items-center gap-2 text-white hover:text-white">
              <FaCommentDots /> {showCommentInput ? "Cancel" : "Comment"}
            </button>
            {showCommentInput && (
              <div className="mt-2">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2 text-white rounded"
                  rows={3}
                  placeholder="Write your comment..."
                ></textarea>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleCommentSave}
                    className="bg-black text-white px-4 py-1 rounded flex items-center gap-1"
                  >
                    <FaSave />
                  </button>
                  {comments[heroData.img] && (
                    <button
                      onClick={handleCommentDelete}
                      className="bg-black text-red-600 px-3 py-1 rounded flex items-center gap-1"
                    >
                      <FaTrash /> 
                    </button>
                  )}
                </div>
              </div>
            )}
            {comments[heroData.img] && !showCommentInput && (
              <p className="mt-2 text-sm italic text-white">Comment: {comments[heroData.img]}</p>
            )}
          </div>
        </div>
      </div>
      <br />

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className={`flex w-80 rounded-full p-1 bg-gray-900`}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-sm font-medium px-4 py-2 rounded-full transition ${
                tab === activeTab ? "bg-amber-400 text-gray-900 shadow" : "text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <br />

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {galleryItems.map((item, index) => (
          <div key={index} className="text-center">
            <div
              onClick={() => handleImageClick(item)}
              className="overflow-hidden rounded-lg shadow cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-32 sm:h-40 object-cover"
              />
            </div>
            <p className="mt-2 text-sm font-medium">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default EpicureGallery;
