import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import RowContainer from './RowContainer';
import nf from "../img/not-found.png";
import Footer from './Footer';

const MenuComponent = ({ data }) => {
  const [{ foodItems, cartShow }] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue, cartShow]);

  // Define the order of categories
  const categoryOrder = ["fried-rice", "noodles", "chopsuey", "pasta", "combo", "mocktails"];

  // Filter out duplicate categories and sort them according to the order
  const uniqueCategories = categoryOrder.filter(category => data.some(item => item.category === category));

  return (
    <div className="w-full h-auto mt-4 flex flex-col items-center">
      {uniqueCategories.length > 0 ? (
        uniqueCategories.map((category) => (
          <section key={category} className="w-full mx-0">
            <div className="w-full flex justify-between">
              <p className="text-3xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-orange-600 transition-all ease-in-out duration-100">
                Our <span className="text-red-600">{category}</span>
              </p>
              <div className="hidden md:flex gap-3 items-center">
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  onClick={() => setScrollValue(-200)}
                  className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center cursor-pointer transition-all duration-100 ease-in-out hover:bg:shadow-lg hover:bg-red-400"
                >
                  <MdChevronLeft className="text-lg text-white" />
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  onClick={() => setScrollValue(+200)}
                  className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center cursor-pointer transition-all duration-100 ease-in-out hover:bg:shadow-lg hover:bg-red-400"
                >
                  <MdChevronRight className="text-lg text-white" />
                </motion.div>
              </div>
            </div>
            <RowContainer
                scrollValue={scrollValue}
                flag={true}
                data={foodItems?.filter((item) => item.category === category)}
              />
          </section>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img className="h-340" src={nf} alt="item not found" />
          <p className="text-xl text-headingColor font-semibold">
            Items Not Available
          </p>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default MenuComponent;
