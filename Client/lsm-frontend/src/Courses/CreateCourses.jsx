import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { createNewCourses } from "../Redux/Slices/coursesSlices";

const CreateCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    console.log(uploadedImage);
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load",function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  }

  function handlerUserValue(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.thumbnail ||
      !userInput.createdBy
    ) {
      toast.error("ALL fields are required !!");
      return;
    }

    const response = await dispatch(createNewCourses(userInput));

    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  }

  return (
    <HomeLayout>
      <div className="flex h-[100vh] items-center justify-center">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-4 rounded-lg p-4 text-white w-[700px] my-10
           shadow-[0_0_10px_black] relative"
        >
          <Link className="absolute top-8 text-2xl link link-accent  cursor-pointer">
            <AiOutlineArrowLeft />
          </Link>

          <h1 className="font-bold text-2xl text-center">Create New Courese</h1>

          <main className="grid grid-cols-2 gap-x-10">
            <div className="gap-y-6 ">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border "
                      src={userInput.previewImage}
                      alt="previewImage"
                    />
                  ) : (
                    <div className="w-full h-44 m-auto border flex items-center justify-center">
                      <h1 className="text-lg font-bold">
                        {" "}
                        Upload your Course thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  onChange={handleImageUpload}
                  className="hidden"
                  type="file"
                  id="image_uploads"
                  name="image_uploads"
                  accept=".jpg, .jpeg, .png"
                />
              </div>
              <div className="flex  flex-col gap-1">
                <label className="text-lg  font-semibold" htmlFor="title">
                  Course Title
                </label>
                <input
                  required
                  type="text"
                  className="bg-transparent px-2 py-1 border"
                  id="title"
                  name="title"
                  placeholder="Enter Courses title "
                  onChange={handlerUserValue}
                  value={userInput.title}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex  flex-col gap-1">
                <label className="text-lg  font-semibold" htmlFor="createdBy">
                  Course Instructor
                </label>
                <input
                  required
                  type="text"
                  className="bg-transparent px-2 py-1 border"
                  id="createdBy"
                  name="createdBy"
                  placeholder="Enter Courses Instructor"
                  value={userInput.createdBy}
                  onChange={handlerUserValue}
                />
              </div>

              <div className="flex  flex-col gap-1">
                <label className="text-lg  font-semibold" htmlFor="category">
                  Course category
                </label>
                <input
                  required
                  type="text"
                  className="bg-transparent px-2 py-1 border"
                  id="category"
                  name="category"
                  placeholder="Enter Courses category"
                  value={userInput.category}
                  onChange={handlerUserValue}
                />
              </div>

              <div className="flex  flex-col gap-1">
                <label className="text-lg  font-semibold" htmlFor="description">
                  Course description
                </label>
                <textarea
                  required
                  type="text"
                  className="bg-transparent h-24 overflow-y-scroll resize-none px-2 py-1 border"
                  id="description"
                  name="description"
                  placeholder="Enter Courses description"
                  value={userInput.description}
                  onChange={handlerUserValue}
                />
              </div>
            </div>
          </main>
          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Create Courses
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default CreateCourses;
