import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";
import axios from "axios";
import { removeUser } from "./utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  console.log("I am cookin some shit for real", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlelogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/auth/logout",
        {},
        {
          withCredentials: false,
        }
      );
      (dispatch(removeUser()));
      navigate('/login')
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm  top-0">
        <div className="flex-1">
          {user && <div>Welcome {user.firstName} </div>}
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user && (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl}
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={handlelogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
