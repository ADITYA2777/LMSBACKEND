import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CoursesCard from "../components/CoursesCard";
import HomeLayout from "../Layouts/HomeLayout";
import { getAllCourses } from "../Redux/Slices/coursesSlices";

function CoursesList() {
  const dispatch = useDispatch();

  const { coursesData } = useSelector((state) => state.courses);

  async function loadedCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadedCourses();
  }, []);
  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 pl-20  flex flex-col gap-10 text-white">
        <h1 className="text-center font-semibold text-3xl mb-5">
          Explore the courses made by
          <span className="font-bold text-yellow-500">Industry exprets</span>
        </h1>
        <div className="mb-10 flex flex-wrap gap-10">
          {coursesData?.map((element) => {
            return <CoursesCard key={element._id} data={element} />;
          })}

          {/* {Array.isArray(coursesData) &&
            coursesData?.map((element) => (
              <CoursesCard key={element._id} data={element} />
            ))} */}
        </div>
      </div>
    </HomeLayout>
  );
}

export default CoursesList;
