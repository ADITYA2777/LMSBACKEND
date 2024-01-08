import { Route, Routes } from "react-router-dom";

import CoursesList from "./Courses/CoursesList";
import AboutUs from "./Pages/AboutUs";
import ContactPage from "./Pages/ContactPage";
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

        <Route path="*" element={<Errorpage />}></Route>
      </Routes>
    </>
  );
}

export default App;
