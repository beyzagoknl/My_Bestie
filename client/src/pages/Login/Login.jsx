import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import "../Login/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth.user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    for (let key in errors) {
      if (errors[key] != null) {
        valid = false;
        break;
      }
    }

    for (let key in user) {
      if (typeof user[key] === "string" && user[key].trim().length === 0) {
        setErrors((prev) => ({ ...prev, [key]: `${key} is required!` }));
        valid = false;
      }
    }

    if (valid) {
      dispatch(loginUser(user));
    }
  };

  const setValues = (e) => {
    let { name, value } = e.target;

    value = value.trim();

    if (name === "email") {
      if (value.trim().length === 0) {
        setErrors((prev) => ({ ...prev, [name]: "Email is required!" }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: null }));
      }
    }

    if (name === "password") {
      if (value.trim().length === 0) {
        setErrors((prev) => ({ ...prev, [name]: "Password is required!" }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: null }));
      }
    }

    setUser((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="login-page">
          <h2 className="login-create-account">Login</h2>
          {state && state.invalidTokenText && (
            <div className="error-alert">{state.invalidTokenText}</div>
          )}
          {auth.loginStatus === "rejected" ? (
            <div className="error-alert">{auth.loginError?.message}</div>
          ) : null}
          <div className="input-container">
            <input
              type="text"
              placeholder="Email address"
              name="email"
              className={`input-field ${
                errors.email ? "invalid-input" : undefined
              }`}
              onChange={setValues}
            />
            {errors.email != null && (
              <p className="error-text">{errors.email}</p>
            )}
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              className={`input-field ${
                errors.password ? "invalid-input" : undefined
              }`}
              placeholder="Password"
              onChange={setValues}
            />
            {errors.password != null && (
              <p className="error-text">{errors.password}</p>
            )}
          </div>
          <button className="btn-submit">
            {auth.loginStatus === "Pending" ? (
              <div className="loadingSpinner" />
            ) : (
              "LOGIN"
            )}
          </button>
          <p className="p-with-link">
            No account yet? Create one&nbsp;
            <button
              type={"button"}
              className="btn-link"
              onClick={() => navigate("/register")}
            >
              <span className="login-here">here</span>.
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
