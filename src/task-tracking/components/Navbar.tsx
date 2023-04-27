import React from "react";
import { Link, NavLink, Navigate } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary margin-left">
        <div className="container-fluid">
          <a className="navbar-brand me-2 mb-2 mb-lg-0" href="">
            <img
              src="../../../src/assets/nermal.svg"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            NERMAL
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-2 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
            </ul>
            <ul className="navbar-nav me-2 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/create">CreateTask</Link>
              </li>
            </ul>
            <ul className="navbar-nav me-2 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/login">Login</Link>
              </li>
            </ul>
            <ul className="navbar-nav me-2 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/signup">SignUp</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
