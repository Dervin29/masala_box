import schezwan from "../img/schezwan.png";
import fried from "../img/fried-rice.png";
import redsauce from "../img/red.png";
import bluelagoon from "../img/Blue-Lagoon.png";

export const heroData = [
  {
    id: 1,
    name: "Fried Rice",
    decp: "Veg Fried Rice",
    price: "Rs. 120",
    imageSrc: fried,
  },
  {
    id: 2,
    name: "Noodles",
    decp: "Schezwan Noodles",
    price: "Rs. 80",
    imageSrc: schezwan,
  },
  {
    id: 3,
    name: "Pasta",
    decp: "Red Sauce Pasta",
    price: "Rs. 250",
    imageSrc: redsauce,
  },
  {
    id: 4,
    name: "Mocktails",
    decp: "Blue Lagoon",
    price: "Rs. 120",
    imageSrc: bluelagoon,
  },
];


export const categories = [
  {
    id: 1,
    name: "Fried Rice",
    urlParamName: "fried-rice",
  },
  {
    id: 2,
    name: "Noodles",
    urlParamName: "noodles",
  },
  {
    id: 3,
    name: "Chopsuey",
    urlParamName: "chopsuey",
  },
  {
    id: 4,
    name: "Pasta",
    urlParamName: "pasta",
  },
  {
    id: 5,
    name: "Combo for 1",
    urlParamName: "combo",
  },
  {
    id: 6,
    name: "Mocktail",
    urlParamName: "mocktail",
  },
 
];