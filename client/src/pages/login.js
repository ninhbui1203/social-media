import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../redux/actions/authAction";

function Login(props) {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;
  const [typePass, setTypePass] = useState(false);

  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h4 className="text-uppercase text-center mb-4">Social - Network</h4>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={handleChangeInput}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="pass position-relative">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChangeInput}
              placeholder="Password"
            />
            <small
              onClick={() => setTypePass(!typePass)}
              className="form-text position-absolute"
            >
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
        </div>

        <p className="my-2">
          You don't have an account? <Link to="/register">Register Now</Link>
        </p>
        <button
          type="submit"
          className="btn btn-dark btn-block"
          disabled={email && password ? false : true}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
