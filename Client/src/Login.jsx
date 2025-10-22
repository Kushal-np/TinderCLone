import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:7000/auth/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff7f8] via-[#ffeef2] to-[#ffe5eb] px-6">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl border border-pink-100 p-10 overflow-hidden">
        {/* Accent circle */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-pink-200/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-fuchsia-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="relative mb-10 text-center">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2 tracking-tight">
            Log in
          </h1>
          <p className="text-sm text-pink-600 font-medium">
            Enter your credentials below
          </p>
        </div>

        {/* Form */}
        <div className="relative space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-pink-600 uppercase tracking-widest"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full h-12 px-4 bg-pink-50 border border-pink-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition-all duration-200"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-pink-600 uppercase tracking-widest"
              >
                Password
              </label>
              <button
                type="button"
                className="text-xs text-pink-500 hover:text-pink-600 transition"
              >
              </button>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full h-12 px-4 bg-pink-50 border border-pink-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-300 transition-all duration-200"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full h-12 mt-4 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-semibold tracking-wide shadow-md shadow-pink-200 hover:shadow-pink-300 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="relative mt-8 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-pink-600 hover:text-fuchsia-600 font-medium transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
