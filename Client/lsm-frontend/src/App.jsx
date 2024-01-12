import { Route, Routes } from "react-router-dom";

import RequiredAuth from "./components/Auth/RequiredAuth";
import CoursesDescription from "./Courses/CoursesDescription";
import CoursesList from "./Courses/CoursesList";
import CreateCourses from "./Courses/CreateCourses";
import AboutUs from "./Pages/AboutUs";
import ContactPage from "./Pages/ContactPage";
import Denied from "./Pages/Denied";
import Errorpage from "./Pages/Errorpage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/signUp" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/courses" element={<CoursesList />}></Route>

        <Route
          path="/course/description"
          element={<CoursesDescription />}
        ></Route>
        <Route path="/denied" element={<Denied />}></Route>

        <Route element={<RequiredAuth allowedRole={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourses/> } />
        </Route>

        <Route path="*" element={<Errorpage />}></Route>
      </Routes>
    </>
  );
}

export default App;
