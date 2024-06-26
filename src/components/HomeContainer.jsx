import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";

const HomeContainer = () => {
  return (
    <section
      className=" grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className=" py-2 flex-1 flex flex-col items-start justify-center gap-4">
        <div className=" flex items-center gap-2 justify-center bg-orange-100 px-2 py-1 rounded-full">
          <p className=" text-base  text-red-600 font-semibold">
            Home Delivery
          </p>
          <div className=" w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-ull h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>

        <p className=" text-[2.5rem] lg:text-[3.5rem] font-bold tracking-wide text-headingColor leading-tight">
          There is no sincere love than the
          <span className=" text-red-600 text-[2.5rem] lg:text-[3.5rem]">
            {" "}
            love of food!
          </span>
        </p>
        <p className="text-lg font-normal text-textColor text-center md:text-left">
          Discover culinary bliss at <span className=" text-red-600">MASALABOX</span>! From
          mouthwatering appetizers to delectable mains and irresistible
          desserts, we've got your cravings covered. Order now and elevate your
          dining experience with just a click!
        </p>

        <button
          type="button"
          className="bg-red-600 text-white w-full md:w-auto px-4 py-3 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 border-none  "
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img
          src={HeroBg}
          className="ml-auto h-420 w-full  lg:h-650 lg:w-auto"
          alt="hero-bg"
        />
        <div className="w-full h-full absolute top-0 left-0  flex items-center justify-center lg:px-32 py-4 gap-5 flex-wrap ">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className=" lg:w-190 lg:h-[230px]  p-6 bg-cardOverlay backdrop-blur rounded-3xl flex flex-col items-center justify-center"
              >
                <img
                  src={n.imageSrc}
                  className=" w-20  lg:w-40 -mt-10 lg:-mt-20 "
                  alt="ice cream"
                />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-0 lg:mt-3">
                  {n.name}
                </p>
                <p className=" text-[12px] lg:text-sm  font-semibold text-lighttextGray my-1 lg:my-3">
                  {n.decp}
                </p>
                <p className="text-sm font-bold  text-red-400">{n.price}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
