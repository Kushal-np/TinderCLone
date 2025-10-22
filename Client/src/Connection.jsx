import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./utils/connectionSlice";

const Connection = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Loading state
  if (connections === null) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-pink-100">
        <div className="w-8 h-8 border-2 border-pink-400/30 border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Empty state
  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-light text-pink-800">No connections yet</h1>
          <p className="text-pink-600 text-sm">Start connecting with people</p>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="min-h-screen bg-pink-100 py-12 px-6 relative overflow-hidden">
      {/* Subtle glow accents */}
      <div className="absolute top-16 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-light text-pink-800 mb-2">My Connections</h1>
          <div className="w-16 h-px bg-gradient-to-r from-pink-500 to-transparent"></div>
        </div>

        {/* Connections Grid */}
        <div className="space-y-6">
          {connections.map((connection) => (
            <div
              key={connection._id}
              className="bg-pink-600/10 border border-pink-500/20 hover:border-pink-500/40 hover:bg-pink-600/20 transition-colors duration-200 rounded-xl shadow-md"
            >
              <div className="p-6">
                <div className="flex items-start gap-6">
                  {/* Profile Image */}
                  <img
                    src={connection.photoUrl}
                    alt={`${connection.firstName} ${connection.lastName}`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-pink-500/20"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-medium text-pink-800 mb-2">
                      {connection.firstName} {connection.lastName}
                    </h2>

                    <p className="text-pink-700 text-sm mb-3 line-clamp-2">
                      {connection.about}
                    </p>

                    {/* Skills */}
                    {connection.skills?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {connection.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium text-pink-400 bg-pink-500/10 border border-pink-500/20 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connection;
