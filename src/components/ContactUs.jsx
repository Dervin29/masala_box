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
    <div className="w-full h-auto my-14 flex items-center justify-center">
      <Card
        color="transparent"
        shadow={false}
        className="w-fit bg-white p-4 flex md:flex-row flex-col"
      >
        <div className="md:w-1/2 flex-grow-0">
          <iframe
            className="w-full h-auto md:h-full  rounded-l-md"
            width="100%"
            height="510"
            title="Google Maps"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Shop%20No.38,%20Masala%20Box,%20Pipeline%20Main%20Road,%204th%20Cross%20Rd,%20DNR%20Layout,%20Malleshwara,%20Bengaluru,%20Karnataka%20560003+(Masala%20Box)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.gps.ie/">gps systems</a>
          </iframe>
        </div>
        <div className="md:w-1/2 p-4">
          <Typography variant="h4" color="blue-gray" className="text-center">
            Contact <span className="text-red-600">Us</span>
          </Typography>
          <Typography className="font-normal text-sm text-center mb-4">
            Connect with us today! We're here to listen and assist you.
          </Typography>
          <form
            className="w-full max-w-screen-lg mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Your Name
              </Typography>
              <Input
                size="lg"
                type="text"
                placeholder="Enter your name.."
                name="Name"
                value={userData.Name}
                onChange={handleChange}
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
              {errors.Name && (
                <Typography className="text-red-500 mt-1">
                  {errors.Name}
                </Typography>
              )}
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Your Email
              </Typography>
              <Input
                size="lg"
                type="email"
                placeholder="abc@gmail.com"
                name="Email"
                value={userData.Email}
                onChange={handleChange}
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
              {errors.Email && (
                <Typography className="text-red-500 mt-1">
                  {errors.Email}
                </Typography>
              )}
            </div>

            <div className="mb-4">
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Message
              </Typography>
              <Textarea
                size="lg"
                type="text"
                placeholder="Enter your message.."
                name="Message"
                value={userData.Message}
                onChange={handleChange}
                className="border-t-blue-gray-200 focus:border-t-gray-900"
              />
              {errors.Message && (
                <Typography className="text-red-500 mt-1">
                  {errors.Message}
                </Typography>
              )}
            </div>

            <Button
              className="mt-4 bg-red-600 border-none"
              fullWidth
              type="submit"
            >
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ContactUs;
