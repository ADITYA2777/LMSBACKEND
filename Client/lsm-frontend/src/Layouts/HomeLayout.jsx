import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import {  useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
const HomeLayout = ({ children }) => {
  // const dispatch = useDispatch();

  const navigate = useNavigate();

  /// checking if user is logged in
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  function changewidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }
  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0";
  }
  function onHandlerLogout(e) {
    e.preventDefault();

    // if(res?.payload?.success)
    navigate("/");
  }
  return (
    <div className="min-h-[90vh]">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drwer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changewidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 h-[100%] sm:80 bg-base-200 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/admin/dashborad"> Admin DashBoard </Link>
              </li>
            )}
            <li>
              <Link to="/courses">All Courese</Link>
            </li>
            <li>
              <Link to="/contact"> Contact us</Link>
            </li>
            <li>
              <Link to="/aboutus">About us</Link>
            </li>
            {!isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className=" w-full flex items-center justify-center">
                  <button className="bg-teal-950 text-white px-4 py-1 rounded-md font-semibold w-full">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="bg-pink-600 px-4 py-1 rounded-md font-semibold text-white w-full">
                    <Link to="/login">Signup</Link>
                  </button>
                </div>
              </li>
            )}
            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className=" w-full flex items-center justify-center">
                  <button className="bg-teal-950 text-white px-4 py-1 rounded-md font-semibold w-full">
                    <Link to="/user/profile">Profile</Link>
                  </button>
                  <button className="bg-pink-600 px-4 py-1 rounded-md font-semibold text-white w-full">
                    <Link to="/logout" onClick={onHandlerLogout}>
                      logout
                    </Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
