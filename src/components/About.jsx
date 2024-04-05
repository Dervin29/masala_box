import React, { useState } from "react";
import img from "../img/undraw_barbecue.png";
import { Link } from "react-router-dom";
import {FaArrowAltCircleDown ,FaArrowAltCircleUp, FaFacebookSquare, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa'; // Import social media icons

const About = () => {
  const [showMore, setShowMore] = useState(false);

  // Calculate initial display length for the paragraph
  const initialDisplayLength = 0.4;

  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="w-full h-auto flex justify-center items-center my-3 ">
      {/* Image Section */}
      <div className="w-1/2">
        <img src={img} alt="About Us" className="w-full h-auto" />
      </div>
      {/* Content Section */}
      <div className="w-1/2 p-8">
        <h2 className="text-3xl font-bold mb-4">About <span className=" text-red-600">Us</span> </h2>
        <p className={`text-lg ${showMore ? "block" : "truncate"}`}>
          {showMore
            ? "Masala Box is a dynamic food delivery service offering a diverse range of Indian, Chinese, and Italian cuisine, delivered straight to your doorstep. With a commitment to quality, affordability, and convenience, Masala Box strives to bring the authentic flavors of various cuisines to your table. Our menu features an enticing selection of appetizers, main courses, desserts, and more, prepared with fresh ingredients and traditional recipes. Whether you're craving a spicy Indian curry, savory Chinese stir-fry, or comforting Italian pasta, Masala Box has something to satisfy every palate. Experience the convenience of online ordering and enjoy delicious meals from the comfort of your home with Masala Box."
            : // Calculate the initial display length
              "Masala Box is a dynamic food delivery service offering a diverse range of Indian, Chinese, and Italian cuisine, delivered straight to your doorstep. With a commitment to quality, affordability, and convenience, Masala Box strives to bring the authentic flavors of various cuisines to your table. Our menu features an enticing selection of appetizers, main courses, desserts, and more, prepared with fresh ingredients and traditional recipes. Whether you're craving a spicy Indian curry, savory Chinese stir-fry, or comforting Italian pasta, Masala Box has something to satisfy every palate. Experience the convenience of online ordering and enjoy delicious meals from the comfort of your home with Masala Box.".slice(
                0,
                // Calculate the display length based on the initial percentage
                Math.ceil(
                  "Masala Box is a dynamic food delivery service offering a diverse range of Indian, Chinese, and Italian cuisine, delivered straight to your doorstep. With a commitment to quality, affordability, and convenience, Masala Box strives to bring the authentic flavors of various cuisines to your table. Our menu features an enticing selection of appetizers, main courses, desserts, and more, prepared with fresh ingredients and traditional recipes. Whether you're craving a spicy Indian curry, savory Chinese stir-fry, or comforting Italian pasta, Masala Box has something to satisfy every palate. Experience the convenience of online ordering and enjoy delicious meals from the comfort of your home with Masala Box.".length *
                    initialDisplayLength
                )
              )}
        </p>
        {!showMore && (
          <button
            className="mt-4 px-5 py-3 rounded-md text-sm text-white bg-red-600 border-none flex justify-center items-center"
            onClick={toggleReadMore}
          >
            Read More <FaArrowAltCircleDown className=" ml-2 w-5"/>
          </button>
        )}
        {showMore && (
          <button
            className="mt-4 px-5 py-3 rounded-md text-sm text-white bg-red-600 border-none flex justify-center items-center"
            onClick={toggleReadMore}
          >
            Read Less<FaArrowAltCircleUp className=" ml-2 w-5"/>
          </button>
        )}

        {/* Social Media Icons */}
        <div className="flex mt-4">
          <FaFacebookSquare className="text-red-600 mr-2 cursor-pointer" size={30} />
          <FaTwitterSquare className="text-red-600 mr-2 cursor-pointer" size={30} />
          <Link to={"https://www.instagram.com/masala_box_malleshwaram?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="}><FaInstagramSquare className="text-red-600 mr-2 cursor-pointer" size={30} /></Link>
        </div>
      </div>
    </div>
  );
};

export default About;
