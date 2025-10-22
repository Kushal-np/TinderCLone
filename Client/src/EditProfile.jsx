import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";

const EditProfile = ({ user }) => {
  console.log(user);
  console.log(user.firstName);
  const [firstName, setFirstName] = useState(user.firstName);
  console.log(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [toast , showToast] = useState(false)

  //save profile button though
  const saveprofile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data?.data));
      showToast(true);
      setTimeout(()=>{
        showToast(false)
      },3000)

    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div>
      <div>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col ">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Edit Profile</h1>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <fieldset className="fieldset">
                  <label className="label">firstName</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input"
                    placeholder="first Name"
                  />
                  <label className="label">LastName</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input"
                    placeholder="last Name"
                  />
                  <label className="label">Photo Url : </label>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="input"
                    placeholder="Photo URL"
                  />
                  <label className="label">Age:</label>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input"
                    placeholder="age"
                  />
                  <label className="label">Gender</label>
                  <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input"
                    placeholder="gender"
                  />
                  <label className="label">About</label>
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="input"
                    placeholder="about"
                  />
                  <button
                    className="btn btn-neutral mt-4"
                    onClick={saveprofile}
                  >
                    Update Edit
                  </button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />

      <div>
        { toast && 
        <div className="toast toast-top toast-center">
          <div className=" alert alert-success">Profile updated Successfully</div>
        </div>}
      </div>
    </div>
  );
};

export default EditProfile;
