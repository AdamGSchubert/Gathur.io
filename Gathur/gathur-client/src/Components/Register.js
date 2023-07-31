import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button} from "bootstrap";
//import { register } from "../modules/authManager";


export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [imageLocation, setImageLocation] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

//   const registerClick = (e) => {
//     e.preventDefault();
//     if (password && password !== confirmPassword) {
//       alert("Passwords don't match. Do better.");
//     } else {
//       const userProfile = {
//         firstName,
//         lastName,
//         displayName,
//         imageLocation,
//         email,
//       };
//       register(userProfile, password).then(() => navigate("/"));
//     }
//   };onSubmit={registerClick}

  return (
    <form>
      <fieldset>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Username">Username</label>
          <input
            id="Username"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="imageLocation">Profile Image URL</label>
          <input
            id="imageLocation"
            type="text"
            onChange={(e) => setImageLocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="button">Register</button>
        </div>
      </fieldset>
    </form>
  );
}
