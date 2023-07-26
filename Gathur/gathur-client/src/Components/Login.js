import React, { useState } from "react";
import { Button } from 'bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Modules/AuthManager";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Invalid email or password"));
  };

  return (
    <form onSubmit={loginSubmit}>
      <fieldset>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
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
          <button>Button</button>
        </div>
        <em>
          Not registered? <Link to="register">Register</Link>
        </em>
      </fieldset>
    </form>
  );
}