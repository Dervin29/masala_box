import React, { useEffect, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
import Footer from "./Footer";

const MainContainer = () => {
  const [{ foodItems, cartShow }] = useStateValue();

  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue, cartShow]);

  function getOneItemFromEachCategory(items) {
    if (!items || !Array.isArray(items)) {
      return [];
    }

    const categories = [];
    const result = [];

    // Filter unique categories
    items.forEach((item) => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
        result.push(item);
      }
    });

    return result;
  }

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleScroll = debounce((direction) => {
    const step = 200; // Adjust this value according to your needs
    if (direction === "left") {
      setScrollValue((prevScrollValue) => prevScrollValue - step);
    } else if (direction === "right") {
      setScrollValue((prevScrollValue) => prevScrollValue + step);
    }
  }, 100); // Adjust the debounce delay as needed

  return (
    <div className=" w-full h-auto flex flex-col items-center  ">
      <HomeContainer />
      <section className=" w-full mx-0 my-8">
        <div className=" w-full flex items-center justify-between ">
          <p className="text-3xl  font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-orange-600 transition-all ease-in-out duration-100">
            Our <span className=" text-red-600">Bestsellers</span>
          </p>
          <div className=" hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={() => handleScroll("left")}
              className=" w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center cursor-pointer transition-all duration-100 ease-in-out hover:bg:shadow-lg hover:bg-red-400"
            >
              <MdChevronLeft className=" text-lg text-white " />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={() => handleScroll("right")}
              className=" w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center cursor-pointer transition-all duration-100 ease-in-out hover:bg:shadow-lg hover:bg-red-400"
            >
              <MdChevronRight className=" text-lg text-white " />
            </motion.div>
          </div>
        </div>

        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={getOneItemFromEachCategory(foodItems)}
          // data={foodItems?.filter((n) => n.category === "fried-rice")}
        />
      </section>

      <MenuContainer />
      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
