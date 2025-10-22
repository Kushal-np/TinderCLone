import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Body from "./Body";
import Feed from "./Feed";
import Login from "./Login";
import Profile from "./Profile";
import EditProfile from "./EditProfile";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} /> 
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
