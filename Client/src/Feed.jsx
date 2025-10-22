import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./utils/constants";
import { addFeed } from "./utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Valentine-themed gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-100 via-pink-300 to-pink-200"></div>

      {/* Soft glowing floating spots */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-1 h-1 bg-pink-400 rounded-full top-1/4 left-1/3 animate-ping opacity-20"></div>
        <div className="absolute w-1.5 h-1.5 bg-fuchsia-300 rounded-full top-2/3 right-1/4 animate-ping opacity-20 animation-delay-500"></div>
        <div className="absolute w-2 h-2 bg-rose-300 rounded-full top-1/2 left-2/3 animate-ping opacity-15 animation-delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md">
        {feed && feed.length > 0 ? (
          <UserCard user={feed[0]} />
        ) : (
          <div className="text-center p-8 bg-white/40 backdrop-blur-xl rounded-2xl border border-pink-300/40 shadow-lg shadow-pink-200/20">
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400 animate-gradient">
                No more profiles
              </h2>
              <p className="text-pink-700 text-sm">
                Check back later for new connections
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  );
};

export default Feed;
