import { fetchUser } from "../utils/FetchLocalStorageData";

const userInfo = fetchUser();

export const initialState ={
    user: userInfo,
}

