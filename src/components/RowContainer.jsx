import React, { useEffect, useRef, useState } from "react";
import nf from "../img/not-found.png";
import { MdShoppingBasket, MdCurrencyRupee } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  console.log(data);

  const rowContainer = useRef();
  const [{ cartItems }, dispatch] = useStateValue();

  const addToCart = (item) => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [...cartItems, item],
    });
    localStorage.setItem("cartItems", JSON.stringify([...cartItems, item]));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div
      ref={rowContainer}
      className={` w-full mt-0 flex items-center gap-4 scroll-smooth  ${
        flag
          ? " overflow-x-scroll scrollbar-none"
          : " overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className=" w-300 min-w-[300px] md:w-340 md:min-w-[340px] h-[250px] bg-white rounded-lg p-3  my-12  backdrop:blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between"
          >
            <div className=" w-full flex items-center justify-between">
              <motion.div
                whileTap={{ scale: 1.2 }}
                className="w-48 h-48 -mt-8 drop-shadow-2xl"
              >
                <img
                  src={item?.imageURL}
                  className="w-full h-full "
                  alt="food item"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className=" w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                onClick={() => addToCart(item)}
              >
                <MdShoppingBasket className=" text-white" />
              </motion.div>
            </div>

            <div className=" w-full flex flex-col items-end justify-end">
              <p className=" text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <div className=" flex items-center gap-8">
                <p className=" text-lg text-headingColor font-semibold flex items-center justify-center">
                  <MdCurrencyRupee className=" text-red-600" />
                  {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className=" w-full flex flex-col items-center justify-center">
          <img className=" h-340" src={nf} alt="item not found" />
          <p className=" text-xl text-headingColor font-semibold">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
