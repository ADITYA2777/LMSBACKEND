import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/coursesSlices";
import { getCourseLecture } from "../../Redux/Slices/LetctureSlice";

const DisplayLecture = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(state);
    // if (!state) navigate("/");
    dispatch(getCourseLecture(state._id));
  }, []);

  return (
    <HomeLayout>
      <div>DisplayLecture</div>
    </HomeLayout>
  );
};

export default DisplayLecture;
