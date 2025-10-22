import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
//app.jsx // app.jsx
import Body from "./Body";
import Feed from "./Feed";
import Login from "./Login";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Connection from "./Connection";
import Requests from "./Requests";
import Signup from "./SignUp";
import ProtectedRoute from "./ProtectRoute";
import PublicRoute from "./PublicRoute";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            {/* ✅ Protected pages (only for logged-in users) */}
            <Route
              index
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="connection"
              element={
                <ProtectedRoute>
                  <Connection />
                </ProtectedRoute>
              }
            />
            <Route
              path="requests"
              element={
                <ProtectedRoute>
                  <Requests />
                </ProtectedRoute>
              }
            />

            {/* ✅ Public pages (redirect if already logged in) */}
            <Route
              path="login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
