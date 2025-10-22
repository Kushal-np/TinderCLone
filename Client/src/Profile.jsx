import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user );
  console.log("We are here lol bro what the fuck");
  console.log("Hey this is user" , user)
  return (
    user&& (
      <div>
        <EditProfile user={user}/>
      </div>
    )
  );
};

export default Profile;
