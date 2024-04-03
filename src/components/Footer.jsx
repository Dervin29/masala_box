import React from 'react'
import { Typography } from "@material-tailwind/react";
import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer className="w-screen h-auto bg-cartBg px-24 py-14">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-transparent text-center md:justify-between">
        <div className=' flex items-center justify-center'>
            <img  className='w-12  object-cover' src={Logo} alt='logo'/>
            <p className=' text-gray-200 text-2xl font-bold ml-2'>MASALA<span className=' text-red-600'>BOX</span></p>
        </div>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 list-none no-underline">
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors text-gray-200 hover:text-red-600 focus:text-red-600"
            >
              Home
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors text-gray-200 hover:text-red-600 focus:text-red-600"
            >
              Menu
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors text-gray-200 hover:text-red-600 focus:text-red-600"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors text-gray-200 hover:text-red-600 focus:text-red-600"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center text-gray-200 font-normal">
        &copy; <span className=' text-red-600'>2024</span> MasalaBox
      </Typography> 
    </footer>
  )
}

export default Footer