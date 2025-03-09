import React from "react";
import { Button } from "antd";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  console.log(isAuthenticated);
  const handleLogout = (): void => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <header
      className={`flex justify-between items-center py-4 px-12 max-w-screen ${
        isAuthenticated && "mx-12 border-2 border-blue-300 rounded-full mt-8"
      }`}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
          <div className="w-5 h-5 bg-white rounded-full"></div>
        </div>{" "}
        <span
          className={`ml-2 text-2xl font-bold  ${
            isAuthenticated ? "text-blue-500" : "text-white"
          }`}
        >
          JOT
        </span>
      </div>

      {!isAuthenticated ? (
        <Button
          type="primary"
          shape="default"
          className="group duration-200 flex items-center gap-2"
        >
          Get Started
          <span className="relative transition-transform duration-200 group-hover:translate-x-1">
            <FaArrowRight />
          </span>
        </Button>
      ) : (
        <Button
          type="primary"
          danger
          icon={<BiLogOut />}
          onClick={handleLogout}
          className="flex items-center"
        >
          Logout
        </Button>
      )}
    </header>
  );
};

export default Header;
