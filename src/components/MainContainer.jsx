import React, {useEffect, useState} from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";
import Footer from "./Footer";

const MainContainer = () => {
  const [{ foodItems, cartShow}] = useStateValue();

  const [scrollValue, setScrollValue] = useState(0);

  useEffect(()=> {}, [scrollValue, cartShow]);

  return (
    <div className=" w-full h-auto flex flex-col items-center  ">
      <HomeContainer />
      <section className=" w-full mx-0 my-6">
        <div className=" w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-orange-600 transition-all ease-in-out duration-100">
            Our Dishes
          </p>
          <div className=" hidden md:flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={()=> setScrollValue(-200)}
              className=" w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center cursor-pointer transition-all duration-100 ease-in-out hover:bg:shadow-lg hover:bg-red-400"
            >
              <MdChevronLeft className=" text-lg text-white " />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={()=> setScrollValue(+200)}
              className=" w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center cursor-pointer transition-all duration-100 ease-in-out hover:bg:shadow-lg hover:bg-red-400"
            >
              <MdChevronRight className=" text-lg text-white " />
            </motion.div>
          </div>
        </div>

        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems?.filter((n) => n.category === "fried-rice")}
        />
      </section>

      <MenuContainer/>
      {cartShow && (<CartContainer/>)}
      <Footer/>
    </div>
  );
};

export default MainContainer;
