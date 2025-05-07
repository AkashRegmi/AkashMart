import React, { useEffect, useState } from "react";
import Ca1 from "../assets/Ca1.png";
import Ca2 from "../assets/Ca2.png";
import Ca3 from "../assets/Ca3.png";
import Ca4 from "../assets/Ca4.png";
import { Link } from "react-router-dom";
const images = [Ca1, Ca2, Ca3, Ca4];
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 2000);
    return () => clearInterval(timer); // Cleanup
  }, [currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto   bg-white overflow-hidden  ">
      <button className="cursor-pointer">
        <Link to="/products">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-full h-full sm:h-[400px] md:h-[500px] object-contain    "
          />
        </Link>
      </button>

      {/* Previous Button */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded hover:bg-opacity-70"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded hover:bg-opacity-70"
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;
