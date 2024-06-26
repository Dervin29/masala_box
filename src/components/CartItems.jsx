import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
let items = [];

const CartItems = ({ item, setFlag, flag }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState(item.quantity);

  
  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };

  const updateQuantity = (action, id) => {
    if (action === "add") {
      setQuantity(quantity + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.quantity += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      // initial state value is one so you need to check if 1 then remove it
      if (quantity === 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQuantity(quantity - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.quantity -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [quantity, items]);

  return (
    <div
      key={item?.id}
      className=" w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2"
    >
      <img
        src={item.imageURL}
        alt="cart item"
        className="w-20 h-20 max-w-[60px rounded-full object-contain"
      />
      <div className="flex flex-col gap-2 ">
        <p className=" text-base text-gray-50 ">{item?.title}</p>
        <p className=" text-sm block text-gray-300 font-semibold">
          Rs.{parseFloat(item?.price) * quantity}
        </p>
      </div>

      <div className=" group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={()=> updateQuantity('remove', item?.id)}>
          <BiMinus className=" text-gray-50" />
        </motion.div>
        <p className=" w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {quantity}
        </p>
        <motion.div whileTap={{ scale: 0.75 }} onClick={()=> updateQuantity('add', item?.id)}>
          <BiPlus className=" text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItems;
