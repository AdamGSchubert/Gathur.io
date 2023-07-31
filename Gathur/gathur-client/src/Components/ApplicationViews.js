import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { HomeLanding } from "./HomePage";
import { ProfileGen } from "./Profile/Profile";
import { GroupNav } from "./NavBars/UserGroups";

export default function ApplicationViews({ isLoggedIn, user, appLogoutCallback }) {
    return (
      <main>
        <Routes>
          <Route path="/">
            <Route
              index
              element={isLoggedIn ? <HomeLanding /> : <HomeLanding />}
            />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<ProfileGen userProfile={user} appLogoutCallback={appLogoutCallback} />}/>
            <Route path="register" element={<Register />} />
            <Route path="mygroups" element={<GroupNav/>}/>
            </Route>
        </Routes>
      </main>
    );
  };