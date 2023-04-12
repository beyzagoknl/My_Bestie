import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, reset } from "../../slices/authSlice";
import { IconContext } from "react-icons";
import "./Nav.css";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import logo from "../../assets/logo.png";

const Nav = () => {
  const [sidebar, setSidebar] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = user != null;

  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate("/login");
  };
  const showSidebar = () => setSidebar(!sidebar);
  console.log(user);
  return (
    <nav>
      <IconContext.Provider value={{ color: "#000000" }}>
        <div className="navbar">
          <div>
            <Link to="#" className="menu-bars">
              <FaBars className="hamburger" onClick={showSidebar} />
            </Link>
          </div>
          <img
            alt="logo"
            className="logo-img"
            onClick={() => navigate("/")}
            src={logo}
          />
          <div>
            <ul className="buttons-nav">
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <button className="button-nav">Log in</button>
                  </Link>
                  <Link to="/register">
                    <button className="button-nav">Sign up</button>
                  </Link>
                </>
              ) : (
                <div className="flex-row v-centered">
                  <Link to="/" className="user-name-nav">
                    Hello, {user.firstName}
                  </Link>
                  <img
                    alt="user"
                    className="user-img"
                    onClick={() => navigate("/")}
                    src={user.image}
                  />
                  <FiLogOut className="icon" onClick={onLogout} />
                </div>
              )}
            </ul>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars-close">
                <AiOutlineClose />
              </Link>
            </li>
            <li className="buttons-hamburger">
              {isAuthenticated ? (
                <>
                  <Link to="/" className="user-name-hamburger">
                    Hello, {user.firstName}
                  </Link>

                  <button className="button-hamburger" onClick={onLogout}>
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="button-hamburger">Log in</button>
                  </Link>
                  <Link to="/register">
                    <button className="button-hamburger">Sign up</button>
                  </Link>
                </>
              )}
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </nav>
  );
};

export default Nav;
