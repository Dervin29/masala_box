import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { Button, Typography } from "@material-tailwind/react";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";

import { categories } from "../utils/data";
import Loader from "./Loader";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [{ foodItems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("error while uploading : Try Again");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("image uploaded successfully");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("image deleted successfully");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("required fields must be entered");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          quantity: 1,
          price: price,
        };
        setIsLoading(false);
        saveItem(data);
        setFields(true);
        setMsg("Data uploaded successfully");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("error while uploading : Try Again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };

  const clearData = () => {
    setIsLoading(false);
    setTitle("");
    setImageAsset(null);
    setCategory("Select Category");
    setPrice("");
  };

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  return (
    <div className="w-full my-6 flex items-center justify-center">
      <div className="w-[60%] md:w-[50%] bg-white border  rounded-lg p-4 flex flex-col items-center justify-center gap-4 ">
        <Typography variant="h4" color="blue-gray" className=" -my-1 ">
          Add <span className=" text-red-600">Item</span>
        </Typography>
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full  p-2 rounded-lg text-center text-lg font-semibold  ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 bg-emerald-800' "
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className=" w-full h-full">
          <label
            for="small-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
          >
            Item Title
          </label>
          <input
            type="text"
            id="small-input"
            class="block w-full p-2.5 bg-gray-200 text-gray-900 placeholder:text-gray-900  text-sm rounded-md border border-none dark:focus:ring-gray-500 dark:focus:border-gray-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="enter the title.."
          />
        </div>
        <div className="w-full">
          <label
            for="small-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
          >
            Select the Item Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-600 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-600 text-3xl hover:text-gray-700" />
                      <p className="text-gray-600 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className=" w-full flex flex-col md:flex-row items-center gap-3 ">
          <div className=" w-full h-full">
            <label
              for="small-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
            >
              Item Price
            </label>
            <input
              type="text"
              id="small-input"
              class="block w-full p-2.5 bg-gray-200 text-gray-900 placeholder:text-gray-900  text-sm rounded-md border border-none dark:focus:ring-gray-500 dark:focus:border-gray-500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="enter the price.."
            />
          </div>
        </div>
        <div className=" flex items-center w-full">
          <Button
            className="mt-4 bg-red-600 outline-none border-none"
            fullWidth
            type="submit"
            onClick={saveDetails}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
