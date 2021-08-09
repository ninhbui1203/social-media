import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../redux/actions/authAction";

import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";

function Navbar(props) {
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
    { label: "Notify", icon: "favorite", path: "/notify" },
  ];

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const isActive = (path) => {
    return path === location.pathname ? "active" : "";
  };

  return (
    <div className="" id="nav_top">
      <ul className="navbar-nav flex-row align-items-center">
        {navLinks.map((item, index) => (
          <li key={index} className={`nav-item ${isActive(item.path)}`}>
            <Link className="nav-link" to={item.path}>
              <span className="material-icons">{item.icon}</span>
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown">
          <span
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <Avatar src={auth.user.avatar} size="medium-avatar" />
          </span>

          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
              Profile
            </Link>
            <label
              className="dropdown-item"
              htmlFor="theme"
              onClick={() =>
                dispatch({ type: GLOBALTYPES.THEME, payload: !theme })
              }
            >
              {theme ? "Light mode" : "Dark mode"}
            </label>
            <div className="dropdown-divider"></div>
            <Link
              className="dropdown-item"
              to="/"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
