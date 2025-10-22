import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "./utils/feedSlice";

const UserCard = ({ user }) => {
  if (!user) return null;

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (status, userId) => {
    try {
      await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });

      // Show popup
      const isInterested = status === "interested";
      setToast({
        show: true,
        type: isInterested ? "success" : "error",
        message: isInterested ? "💌 Request Sent!" : "🚫 User Ignored",
      });

      // Hide popup + remove card smoothly
      setTimeout(() => {
        setToast({ show: false, type: "", message: "" });
        dispatch(removeUserFromFeed(userId));
      }, 1500);
    } catch (error) {
      console.error(error.message);
      setToast({
        show: true,
        type: "error",
        message: "⚠️ Something went wrong!",
      });
      setTimeout(() => setToast({ show: false, type: "", message: "" }), 1200);
    }
  };

  return (
    <>
      <div
        className="max-w-md w-full mx-auto bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-pink-200/60 animate-fadeIn"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative h-80 w-full">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className={`object-cover w-full h-full transition-transform duration-700 ease-in-out ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6 bg-gradient-to-b from-white to-rose-50/70 backdrop-blur-md">
          <h2 className="text-3xl font-semibold text-gray-800 tracking-tight font-[cursive]">
            {firstName} {lastName}
          </h2>

          <p className="mt-2 flex items-center gap-3 text-sm font-medium text-gray-600">
            <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full">{gender}</span>
            <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full">{age} yrs</span>
          </p>

          <p className="mt-4 text-gray-700 text-sm leading-relaxed italic border-l-4 border-pink-300 pl-4">
            “{about}”
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => handleSubmit("interested", _id)}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold text-sm tracking-wide shadow hover:from-rose-600 hover:to-pink-700 transition-transform hover:scale-105"
            >
              ♥ Interested
            </button>
            <button
              onClick={() => handleSubmit("ignored", _id)}
              className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm bg-gray-50 hover:bg-gray-100 hover:scale-105 transition-transform"
            >
              ✕ Ignore
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Popup Toast */}
      {toast.show && (
        <div className="fixed top-50 z-99 left-1/2 transform -translate-x-1/2 ">
          <div
            className={`px-6 py-3 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
            style={{
              animation: "fadeInOut 1.5s ease forwards",
            }}
          >
            {toast.message}
          </div>
        </div>
      )}

      {/* Simple animation for popup */}
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-20px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
      `}</style>
    </>
  );
};

export default UserCard;
