import React from "react";
import yet from "../img/yet_to_develop-.png";

const About = () => {
  return (
      <div className=" flex flex-col items-center justify-center py-2 my-32">
        <img className="" src={yet} alt="about" />
        {/* Updated alt attribute */}
        <p className="text-lg font-semibold">
          Yet to <span className="text-red-600">develop</span>
        </p>
      </div>


  );
};

export default About;
