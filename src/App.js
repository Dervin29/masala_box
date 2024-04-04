import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Header, MainContainer, CreateContainer, MenuComponent, ContactUs, About } from "./components";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

const App = () => {

  const [{foodItems}, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <AnimatePresence >
      <div className=" w-screen h-auto flex flex-col bg-blue-gray-50 ">
        <Header />
        <main className="mt-14 md:mt:20 px-4 md:px-16 pt-10  w-full">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/menu" element={<MenuComponent data={(foodItems)}/>} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
