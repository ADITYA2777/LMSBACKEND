// import { unwrapResult } from "@reduxjs/toolkit";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { BsPersonCircle } from "react-icons/bs";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// import HomeLayout from "../Layouts/HomeLayout";
// import { createAccount } from "../Redux/Slices/AuthSlices";

// const SignUpPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [previewImage, setPreviewImage] = useState("");
//   // for user input
//   const [signupData, setSignupData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     avatar: "",
//   });
//   const handleUserInput = (e) => {
//     const { name, value } = e.target;
//     setSignupData({
//       ...signupData,
//       [name]: value,
//     });
//   };

//   const getImage = (e) => {
//     e.preventDefault();
//     //getting the image

//     const uploadedImage = e.target.files[0];

//     if (uploadedImage) {
//       setSignupData({
//         ...signupData,
//         avatar: uploadedImage,
//       });
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(uploadedImage);
//       fileReader.addEventListener("load", function () {
//         setPreviewImage(this.result);
//         console.log(this.result);
//       });
//     }
//   };

//   const createNewAccount = async (e) => {
//     e.preventDefault();

//     try {
//       if (
//         !signupData.email ||
//         !signupData.password ||
//         !signupData.fullName ||
//         !signupData.avatar
//       ) {
//         toast.error("Please fill all  the details");
//         return;
//       }

//       // checking the name field length
//       if (signupData.fullName.length < 5) {
//         toast.error("Name should be atleast of 5 characters");
//         return;
//       }

//       // email validation using regex
//       if (
//         !signupData.email.match(
//           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//         )
//       ) {
//         toast.error("Invalid email id");
//         return;
//       }

//       // password validation using regex
//       if (
//         !signupData.password.match(
//           /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
//         )
//       ) {
//         toast.error(
//           "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
//         );
//         return;
//       }

//       const formData = new FormData();
//       formData.append("fullName", signupData.fullName);
//       formData.append("email", signupData.email);
//       formData.append("password", signupData.password);
//       formData.append("avatar", signupData.avatar);

//       //dispatch create  account action

//       const response = await dispatch(createAccount(formData));
//       // console.log(response);
//       //   const resultAction = await dispatch(createAccount(formData));
//       //   const response = unwrapResult(resultAction);
//       console.log(response);

//       if (response?.success) {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Error creating account:", error);
//     }

//     // clearing the signup inputs
//     setSignupData({
//       fullName: "",
//       email: "",
//       password: "",
//       avatar: "",
//     });
//     setPreviewImage("");
//   };

//   return (
//     <HomeLayout>
//       <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
//         <form
//           noValidate
//           onSubmit={createNewAccount}
//           className="flex flex-col justify-center rounded-lg gap-3 p-4 text-white w-96 shadow-[0_0_10px_black]"
//         >
//           <h1 className="text-2xl text-center font-bold ">Registration Page</h1>

//           <label htmlFor="image_uploads" className="cursor-pointer">
//             {previewImage ? (
//               <img
//                 className="w-24 h-24 rounded-full m-auto"
//                 src={previewImage}
//               />
//             ) : (
//               <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
//             )}
//           </label>
//           <input
//             onChange={getImage}
//             className="hidden"
//             type="file"
//             id="image_uploads"
//             name="image_uploads"
//             accept=".png,.jpg,.jpeg,.svg"
//           />

//           <div className="flex flex-col gap-1 ">
//             <label htmlFor="fullName" className="font-semibold">
//               UserName
//             </label>
//             <input
//               type="text"
//               required
//               name="fullName"
//               id="fullName"
//               placeholder="Enter your fullName.."
//               className="bg-transparent px-2 py-1 border"
//               onChange={handleUserInput}
//               value={signupData.fullName}
//             />
//           </div>

//           <div className="flex flex-col gap-1 ">
//             <label htmlFor="email" className="font-semibold">
//               Email
//             </label>
//             <input
//               type="email"
//               required
//               name="email"
//               id="email"
//               placeholder="Enter your email.."
//               className="bg-transparent px-2 py-1 border"
//               onChange={handleUserInput}
//               value={signupData.email}
//             />
//           </div>
//           <div className="flex flex-col gap-1">
//             <label htmlFor="password" className="font-semibold">
//               Password
//             </label>
//             <input
//               type="password"
//               required
//               name="password"
//               id="password"
//               placeholder="Enter your password.."
//               className="bg-transparent px-2 py-1 border"
//               onChange={handleUserInput}
//               value={signupData.password}
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 transition-all hover:bg-yellow-500 ease-in-out duration-300 text-white mt-2 py-2 rounded-sm font-semibold text-lg cursor-pointer"
//           >
//             Create account
//           </button>

//           <p className="text-center">
//             Already have an account ?{" "}
//             <Link to={"/login"} className="link text-accent cursor-pointer">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </HomeLayout>
//   );
// };

// export default SignUpPage;

import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlices";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setImagePreview] = useState("");

  // for user input
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  // function to set the signup data
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  // function to handle the image upload
  const getImage = (event) => {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    // if image exists then getting the url link of it
    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImagePreview(this.result);
      });
    }
  };

  // function to create account
  const createNewAccount = async (event) => {
    event.preventDefault();

    // checking the empty fields
    if (
      !signupData.avatar ||
      !signupData.email ||
      !signupData.fullName ||
      !signupData.password
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    // checking the name field length
    if (signupData.fullName.length < 5) {
      toast.error("Name should be atleast of 5 characters");
      return;
    }

    // email validation using regex
    if (
      !signupData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Invalid email id");
      return;
    }

    // password validation using regex
    if (
      !signupData.password.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      )
    ) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    // creating the form data from the existing data
    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    // calling create account action
    const response = await dispatch(createAccount(formData));

    // redirect to login page if true
    if (response?.success) {
      navigate("/");
    }

    // clearing the signup inputs
    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setImagePreview("");
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={createNewAccount}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>

          {/* input for image file */}
          <label className="cursor-pointer" htmlFor="image_uploads">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
                alt="preview image"
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={getImage}
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png"
          />

          {/* input for name */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor="fullName">
              Name
            </label>
            <input
              required
              type="name"
              name="fullName"
              id="fullName"
              placeholder="Enter your name"
              className="bg-transparent px-2 py-1 border"
              value={signupData.fullName}
              onChange={handleUserInput}
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
              value={signupData.email}
              onChange={handleUserInput}
            />
          </div>

          {/* input for password */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold" htmlFor="password">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="bg-transparent px-2 py-1 border"
              value={signupData.password}
              onChange={handleUserInput}
            />
          </div>

          {/* registration button */}
          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Create Account
          </button>

          <p className="text-center">
            Already have an account ?{" "}
            <Link to={"/login"} className="link text-accent cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};

export default SignUpPage;