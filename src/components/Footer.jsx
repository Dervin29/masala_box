import React from "react";
import { Typography } from "@material-tailwind/react";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-screen h-auto bg-cartBg px-24 py-14">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-transparent text-center md:justify-between">
        <div className=" flex items-center justify-center">
          <img className="w-12  object-cover" src={Logo} alt="logo" />
          <p className=" text-gray-200 text-2xl font-bold ml-2">
            MASALA<span className=" text-red-600">BOX</span>
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 list-none no-underline">
          <Link to={"/"} className=" decoration-transparent no-underline">
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className=" text-lg font-normal transition-colors text-gray-200 hover:text-red-600 focus:text-red-600 no-underline"
              >
                Home
              </Typography>
            </li>
          </Link>
          <Link to={"/menu"} className="no-underline">
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className=" text-lg font-normal transition-colors text-gray-200 hover:text-red-600 focus:text-red-600 no-underline"
              >
                Menu
              </Typography>
            </li>
          </Link>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className=" text-lg font-normal transition-colors text-gray-200 hover:text-red-600 focus:text-red-600 no-underline"
            >
              About Us
            </Typography>
          </li>
          <Link to={"/contact"} className=" no-underline">
            {" "}
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className=" text-lg font-normal transition-colors text-gray-200 hover:text-red-600 focus:text-red-600 no-underline"
              >
                Contact Us
              </Typography>
            </li>
          </Link>

          
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography
        color="blue-gray"
        className="text-center text-gray-200 font-normal"
      >
        &copy; <span className=" text-red-600">2024</span> MasalaBox
      </Typography>
    </footer>
  );
};

export default Footer;
