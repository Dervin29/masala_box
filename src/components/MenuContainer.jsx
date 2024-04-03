import React, { useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import {motion} from 'framer-motion';

const MenuContainer = () => {
  const [filter, setFilter] = useState("fried-rice");
  
  return (
    <section className=" w-full my-6" id="menu">
      <div className=" w-full flex flex-col items-center justify-normal">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-orange-600  mr-auto">
          Our Hot Dishes
        </p>

        <div  className=" w-full flex items-start justify-start lg:justify-center gap-8 py-6 overflow-auto scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
              whileTap={{scale:0.75}}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
                } bg-card hover:bg-cartNumBg w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-in-out`}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div
                  className={`w-10 h-10  ${
                    filter === category.urlParamName
                      ? "bg-card"
                      : "bg-cartNumBg"
                  } rounded-full  group-hover:bg-white flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "bg-white"
                    }group-hover:text-textColor`}
                  />
                </div>
                <p
                  className={` text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
