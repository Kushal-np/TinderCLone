import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [toast, showToast] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const saveprofile = async () => {
    setIsLoading(true);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      showToast(true);
      setTimeout(() => showToast(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-16 px-6">
      {/* Lightish Pink Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-100 via-pink-200 to-pink-100"></div>

      {/* Medium Dark Pink Glows */}
      <div className="absolute top-16 left-12 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-light text-pink-800 mb-2 tracking-tight">
            Edit Profile
          </h1>
          <div className="w-16 h-px bg-gradient-to-r from-pink-500 to-transparent"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="space-y-8">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-6">
              {["firstName", "lastName"].map((field, idx) => {
                const value = field === "firstName" ? firstName : lastName;
                const setter = field === "firstName" ? setFirstName : setLastName;
                const placeholder = field === "firstName" ? "John" : "Doe";
                return (
                  <div key={idx} className="space-y-2">
                    <label className="block text-xs font-medium text-pink-700/80 uppercase tracking-wider">
                      {field === "firstName" ? "First Name" : "Last Name"}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      onFocus={() => setFocusedField(field)}
                      onBlur={() => setFocusedField("")}
                      className="w-full h-11 px-0 bg-transparent border-b border-pink-400/40
                        text-pink-900 placeholder-pink-400 focus:outline-none focus:border-pink-600
                        transition-colors duration-200 text-sm"
                      placeholder={placeholder}
                    />
                  </div>
                );
              })}
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-pink-700/80 uppercase tracking-wider">
                Photo URL
              </label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                onFocus={() => setFocusedField("photoUrl")}
                onBlur={() => setFocusedField("")}
                className="w-full h-11 px-0 bg-transparent border-b border-pink-400/40
                  text-pink-900 placeholder-pink-400 focus:outline-none focus:border-pink-600
                  transition-colors duration-200 text-sm"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            {/* Age and Gender */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-pink-700/80 uppercase tracking-wider">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  onFocus={() => setFocusedField("age")}
                  onBlur={() => setFocusedField("")}
                  className="w-full h-11 px-0 bg-transparent border-b border-pink-400/40
                    text-pink-900 placeholder-pink-400 focus:outline-none focus:border-pink-600
                    transition-colors duration-200 text-sm"
                  placeholder="25"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-pink-700/80 uppercase tracking-wider">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full h-11 px-0 bg-transparent border-b border-pink-400/40
                    text-pink-900 focus:outline-none focus:border-pink-600
                    transition-colors duration-200 text-sm appearance-none cursor-pointer"
                >
                  <option value="" className="bg-pink-100 text-pink-900">
                    Select
                  </option>
                  <option value="male" className="bg-pink-100 text-pink-900">
                    Male
                  </option>
                  <option value="female" className="bg-pink-100 text-pink-900">
                    Female
                  </option>
                  <option value="other" className="bg-pink-100 text-pink-900">
                    Other
                  </option>
                </select>
              </div>
            </div>

            {/* About */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-pink-700/80 uppercase tracking-wider">
                About
              </label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                onFocus={() => setFocusedField("about")}
                onBlur={() => setFocusedField("")}
                rows="4"
                className="w-full px-0 py-2 bg-transparent border-b border-pink-400/40
                  text-pink-900 placeholder-pink-400 focus:outline-none focus:border-pink-600
                  transition-colors duration-200 text-sm resize-none"
                placeholder="Tell us about yourself"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="border-l-2 border-red-500/50 pl-4 py-2">
                <p className="text-red-400/90 text-sm">{error}</p>
              </div>
            )}

            {/* Save Button */}
            <div className="pt-4">
              <button
                onClick={saveprofile}
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-pink-500 to-pink-400
                  hover:from-pink-600 hover:to-pink-500
                  text-white font-medium text-sm tracking-wide
                  transition-all duration-200
                  disabled:opacity-40 disabled:cursor-not-allowed
                  flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:pl-12 lg:border-l lg:border-pink-400/30">
            <div className="mb-6">
              <h2 className="text-sm font-medium text-pink-700/80 uppercase tracking-wider">
                Preview
              </h2>
            </div>
            <UserCard
              user={{ firstName, lastName, photoUrl, age, gender, about }}
            />
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {toast && (
        <div className="fixed top-8 right-8 z-50">
          <div className="bg-pink-200 border border-pink-500/30 text-pink-900 px-6 py-4 shadow-2xl">
            <p className="text-sm font-medium">Profile updated successfully</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
