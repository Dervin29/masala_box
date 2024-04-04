import React, { useState, useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import empty from "../img/empty_cart.png";
import { useStateValue } from "../context/StateProvider";
import { app } from "../firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { actionType } from "../context/reducer";
import CartItems from "./CartItems";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      user: !cartShow,
    });
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.quantity * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full px-3 md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className=" w-full flex items-center justify-between p-4  cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className=" text-textColor text-3xl " />
        </motion.div>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className=" text-textColor text-lg font-semibold"
        >
          Cart
        </motion.p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col mr-8 ">
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none ">
            {cartItems &&
              cartItems.map((item) => (
                <CartItems
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          <div className=" w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2 ">
            <div className=" w-full flex items-center justify-between">
              <p className=" text-gray-400 text-lg"> Sub Total</p>
              <p className=" text-gray-400 text-lg">Rs. {tot}</p>
            </div>

            <div className=" w-full flex items-center justify-between">
              <p className=" text-gray-400 text-lg"> Delivery</p>
              <p className=" text-gray-400 text-lg">Rs. 150</p>
            </div>

            <hr className="w-full border-gray-400" />

            <div className=" w-full border-b border-gray-600 my-2"></div>
            <div className=" w-full flex items-center justify-between">
              <p className=" text-gray-200 text-xl font-semibold">Total</p>
              <p className=" text-gray-200 text-xl font-semibold">
                Rs. {tot + 150}
              </p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className=" w-full p-2 rounded-full bg-yellow-600 border-none text-gray-50 text-lg my-2
        hover:shadow-lg "
              >
                {" "}
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className=" w-full p-2 rounded-full bg-yellow-600 border-none text-gray-50 text-lg my-2
          hover:shadow-lg "
                onClick={login}
              >
                {" "}
                Login to Check Out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className=" w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={empty} alt="empty cart" className=" w-300" />
          <p className=" text-xl text-textColor font-semibold">
            Add Items to the Cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
