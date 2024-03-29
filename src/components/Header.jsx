import React, { useState } from "react";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { MdShoppingCart, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

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

  const logout = () =>{
    setIsMenu(false);
    localStorage.clear()

    dispatch({
      type:actionType.SET_USER,
      user: null
    })
  }

  return (
    <header className=" fixed  z-50 w-screen p-2  px-4 md:p-6 md:px-16 bg-primary">
      {/* desktop and tablet */}
      <div className=" hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2 decoration-transparent">
          <img src={Logo} className="w-8 object-cover" alt="logo"></img>
          <p className=" text-headingColor text-xl font-bold "> MasalaBox</p>
        </Link>

        <div className=" flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className=" flex items-center gap-8 list-none"
          >
            <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Services
            </li>
          </motion.ul>


          <div className=" relative flex items-center justify-center ">
            <MdShoppingCart className="text-textColor text-2xl ml-8 cursor-pointer" />
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>


          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className=" w-10 min-w-[40px] min-h-[40px] shadow-2xl rounded-full"
              alt="user profile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className=" w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === "alandoncr7@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p  className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100  transition-all duration-100 ease-linear text-textColor text-base decoration-transparent">
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <p className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100  transition-all duration-100 ease-linear text-textColor text-base"
                onClick={logout}>
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className=" flex items-center justify-between md:hidden w-full h-full  p-4">
        

        <div className=" relative flex items-center justify-center ">
            <MdShoppingCart className="text-textColor text-2xl ml-8 cursor-pointer" />
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

          <Link to={"/"} className="flex items-center gap-2 decoration-transparent">
          <img src={Logo} className="w-8 object-cover" alt="logo"></img>
          <p className=" text-headingColor text-xl font-bold "> MasalaBox</p>
        </Link>


        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className=" w-10 min-w-[40px] min-h-[40px] shadow-2xl rounded-full"
            alt="user profile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className=" w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user && user.email === "alandoncr7@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100  transition-all duration-100 ease-linear text-textColor text-base decoration-transparent">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className=" flex flex-col list-none">
                <li onClick={()=> setIsMenu(false)} className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100  px-4 py-2">
                  Home
                </li>
                <li onClick={()=> setIsMenu(false)} className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100  px-4 py-2">
                  Menu
                </li>
                <li onClick={()=> setIsMenu(false)} className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100  px-4 py-2">
                  About Us
                </li>
                <li onClick={()=> setIsMenu(false)} className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100  px-4 py-2">
                  Services
                </li>
              </ul>
              <p className=" m-2 p-2 rounded-md flex items-center justify-center bg-gray-200  gap-3 cursor-pointer hover:bg-gray-300  transition-all duration-100 ease-in-out text-textColor text-base" 
              onClick={logout}>
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
