import React, { useEffect, useState } from 'react';
import { useStateValue } from "../context/StateProvider";
import RowContainer from './RowContainer';
import nf from "../img/not-found.png";
import Footer from './Footer';
import { actionType } from "../context/reducer";

const MenuComponent = ({ data }) => {
  const [{ foodItems, cartItems }, dispatch] = useStateValue();
  const addToCart = (item) => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [...cartItems, item],
    });
    localStorage.setItem("cartItems", JSON.stringify([...cartItems, item]));
  };

  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue, cartItems]);

  const customSort = (a, b) => {
    const order = {
      "Soups": 1,
      "Fries": 2,
      "Momos": 3,
      "Gobi": 4,
      "Mushroom": 5,
      "Babycorn": 6,
      "Paneer": 7,
      "Soya": 8,
      "Quick Bites": 9,
      "Fried Rice": 10,
      "Noodles": 11,
      "Chopsuey": 12,
      "Pasta": 13,
      "Combo for 1": 14,
      "Mocktail": 15
    };

    return order[a] - order[b];
  };

  const sortedCategories = Object.keys(foodItems.reduce((acc, item) => {
    if (data.map(d => d.category).includes(item.category)) {
      acc[item.category] = [...(acc[item.category] || []), item];
    }
    return acc;
  }, {})).sort((a, b) => customSort(a, b));

  return (
    <div className="w-full h-auto mt-2 flex flex-col items-center">
      {sortedCategories.length > 0 ? (
        sortedCategories.map((category) => (
          <section key={category} className="w-full mx-0">
            <div className="w-full flex justify-between ">
              <p className="text-3xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-orange-600 transition-all ease-in-out duration-100">
                Our <span className="text-red-600">{category}</span>
              </p>
            </div>
            <RowContainer
              scrollValue={scrollValue}
              flag={true}
              data={foodItems?.filter((item) => item.category === category)}
              addToCart={addToCart} // Pass the addToCart function to RowContainer
            />
          </section>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img className="h-340" src={nf} alt="item not found" />
          <p className="text-xl text-headingColor font-semibold">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default MenuComponent;
