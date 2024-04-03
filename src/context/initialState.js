import { fetchCart, fetchUser } from "../utils/FetchLocalStorageData";

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState ={
    user: userInfo,
    foodItems: null,
    cartShow: false,
    cartItems: cartInfo,
}

