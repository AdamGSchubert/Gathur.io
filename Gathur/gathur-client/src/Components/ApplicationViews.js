import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { HomeLanding } from "./HomePage";

export default function ApplicationViews({ isLoggedIn, userProfile }) {
    return (
      <main>
        <Routes>
          <Route path="/">
            <Route
              index
              element={isLoggedIn ? null : <HomeLanding />}
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            </Route>
        </Routes>
      </main>
    );
  };