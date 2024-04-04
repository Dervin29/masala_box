import React, { useState } from "react";
import {
  Card,
  Input,
  Textarea,
  Button,
  Typography,
} from "@material-tailwind/react";

const ContactUs = () => {
  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    const nameRegex = /^[a-zA-Z ]{6,}$/; // Only letters and spaces, minimum 6 characters
    if (!userData.Name || !nameRegex.test(userData.Name)) {
      errors.Name =
        "Name must be at least 6 characters long and contain only letters.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.Email || !emailRegex.test(userData.Email)) {
      errors.Email = "Invalid email format.";
    }

    // Message validation
    if (!userData.Message) {
      errors.Message = "Message cannot be empty.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Send form data
      console.log("Form submitted:", userData);
      // Clear form fields
      setUserData({
        Name: "",
        Email: "",
        Message: "",
      });
    }
  };

  return (
    <div className="w-full h-auto my-9 flex items-center justify-center">
      <Card color="transparent" shadow={false} className="w-fit bg-white p-6">
        <Typography variant="h4" color="blue-gray">
          Contact <span className=" text-red-600">Us</span>
        </Typography>
        <Typography  className="font-normal text-sm ">
        Connect with us today! We're here to listen and assist you.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              type="text"
              placeholder="Enter your name.."
              name="Name"
              value={userData.Name}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              
            />
            {errors.Name && <Typography className="-my-5 " color="red">{errors.Name}</Typography>}

            <Typography variant="h6" color="blue-gray" className=" -mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              type="email"
              placeholder="abc@gmail.com"
              name="Email"
              value={userData.Email}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              
            />
            {errors.Email && (
              <Typography color="red" className="-my-5 " >{errors.Email}</Typography>
            )}

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Message
            </Typography>
            <Textarea
              size="lg"
              type="text"
              placeholder="Enter your message.."
              name="Message"
              value={userData.Message}
              onChange={handleChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              
            />
            {errors.Message && (
              <Typography className="-my-5 "  color="red">{errors.Message}</Typography>
            )}
          </div>

          <Button className="mt-8 bg-red-600 outline-none border-none" fullWidth type="submit">
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ContactUs;
