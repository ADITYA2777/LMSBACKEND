import { Route, Routes } from "react-router-dom";

import AboutUs from "./Pages/AboutUs";
import Errorpage from "./Pages/Errorpage";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/signUp" element={<SignUpPage/>}></Route>

        <Route path="*" element={<Errorpage />}></Route>
      </Routes>
    </>
  );
}

export default App;
