import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    if (!firstName || !lastName || !emailId || !password) return;

    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:7000/auth/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
        
      );
      console.log(firstName, lastName , emailId)
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSignUp();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Register
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Create Your Account !
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full h-11 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm px-3 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full h-11 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm px-3 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
            />
          </div>

          <input
            type="email"
            placeholder="Email Address"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full h-11 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm px-3 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full h-11 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm px-3 
              focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
          />

          <button
            onClick={handleSignUp}
            disabled={isLoading}
            className="w-full h-12 mt-4 bg-gradient-to-r from-pink-600 to-pink-500 hover:opacity-90 
              text-white font-medium rounded-lg shadow-md transition-all duration-200 
              disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
