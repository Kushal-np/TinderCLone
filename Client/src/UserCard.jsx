import React from "react";

const UserCard = ({ user }) => {
  console.log("User data received:", user);

  const users = Array.isArray(user) ? user : user ? [user] : [];

  return (
    <div
      className="flex flex-wrap justify-center gap-6 p-6"
      data-theme="autumn"
    >
      {users.map((u) => (
        <div
          key={u._id || Math.random()}
          className="card bg-base-100 w-80 shadow-md hover:shadow-xl transition-all duration-300"
        >
          <figure>
            <img
              src={u.photoUrl || "https://via.placeholder.com/300x200"}
              alt={`${u.firstName} ${u.lastName}` || "User"}
              className="object-cover h-48 w-full"
            />
            <p>${u.age}</p>
          </figure>
          <div className="card-body">
            <h2 className="card-title text-lg font-semibold">
              {u.firstName && u.lastName
                ? `${u.firstName} ${u.lastName}`
                : "Unnamed User"}
            </h2>

            <p className="text-gray-600 mt-2">
              {u.about || "No bio available."}
            </p>
            {u.skills && u.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {u.skills.map((skill, index) => (
                  <span key={index} className="badge badge-primary badge-sm">
                    {skill}
                  </span>
                ))}
              </div>
            )}
            <div className="card-actions  mt-4 flex flex-row justify-center items-center flex-wrap">
              <button className="btn btn-primary">View Profile</button>
              <button className="btn btn-primary">Ignore</button>
              <button className="btn btn-primary">Interested</button>
            </div>
          </div>
        </div>
      ))}

      {users.length === 0 && (
        <p className="text-gray-500 mt-8">No feed data available.</p>
      )}
    </div>
  );
};

export default UserCard;
