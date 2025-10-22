import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";
import axios from "axios";
import { removeUser } from "./utils/userSlice";
import { Menu, LogOut, User, Users } from "lucide-react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/auth/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-pink-100 relative via-pink-200 to-pink-100 shadow-md border-b border-pink-300/40 backdrop-blur-xl  top-0 left-0 z-90">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-pink-600 hover:text-pink-500 transition-all duration-300"
        >
          Sparko
        </Link>

        {/* Right section */}
        {user && (
          <div className="flex items-center gap-4 sm:gap-6 relative">
            <span className="hidden sm:block text-pink-800 text-2xl font-semibold">
             {user.firstName}
            </span>

            {/* Avatar */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-pink-400 shadow-lg hover:shadow-pink-400/50 transition-all duration-300"
            >
              <img
                src={user.photoUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 rounded-full hover:bg-pink-500/10 transition-all duration-200"></div>
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div
                className="absolute right-0 top-20 w-64 bg-white/95 backdrop-blur-xl border border-pink-300/40 
                  rounded-2xl shadow-lg shadow-pink-200/40 py-3 z-50 animate-fadeIn"
              >
                <div className="px-5 py-2 border-b border-pink-100 mb-2">
                  <p className="text-sm text-gray-600">Logged in as</p>
                  <p className="font-semibold text-gray-800 truncate">{user.emailId}</p>
                </div>

                <ul className="space-y-1 px-2 text-gray-700">
                  <li>
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-pink-50 transition-all duration-200"
                    >
                      <User className="w-5 h-5 text-pink-600" />
                      Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/connection"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-pink-50 transition-all duration-200"
                    >
                      <Users className="w-5 h-5 text-pink-600" />
                      Connections
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/requests"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-pink-50 transition-all duration-200"
                    >
                      <Menu className="w-5 h-5 text-pink-600" />
                      Requests
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg 
                        text-red-500 hover:bg-red-50 transition-all duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
