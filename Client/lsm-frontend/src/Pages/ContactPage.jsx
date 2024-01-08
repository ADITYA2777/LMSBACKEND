import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../Helper/axoisinstance";
import { isEmail } from "../Helper/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";

const ContactPage = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    console.log("contact", name, value);
    setInputUser({
      ...inputUser,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!inputUser.email || !inputUser.name || !inputUser.message) {
      toast.error("ALL field are mandatory");
      console.log(
        "contactVal:",
        !inputUser.email || !inputUser.name || !inputUser.message
      );
      return;
    }
    if (!isEmail(inputUser.email)) {
      toast.error("Invalid Email !!");
      return;
    }
    try {
      const response = axiosInstance.post("/contact", ...inputUser);
      toast.promise(response, {
        loading: "Submitting your meassage ",
        success: "Form submiitted successfully",
        error: " Failed to submit the form ",
      });
      const contactResponse = await response;
      console.log("result:", contactResponse);
      if (contactResponse?.data?.success) {
        setInputUser({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Operation failed .....");
    }
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Contact Form </h1>

          <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor="name">
              Name
            </label>
            <input
              required
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={inputUser.name}
            />
          </div>

          {/* input for email */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={inputUser.email}
            />
          </div>

          {/* input for password */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor="message">
              Message
            </label>
            <textarea
              required
              name="message"
              id="message"
              placeholder="Enter your message"
              className="bg-transparent px-2 py-2 border rounded-sm h-40 resize-none"
              onChange={handleUserInput}
              value={inputUser.message}
            />
          </div>

          {/* registration button */}
          <button
            className="w-full bg-blue-600 hover:bg-yellow-500 transition-all ease-in-out duration-300
             rounded-sm py-1 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default ContactPage;
