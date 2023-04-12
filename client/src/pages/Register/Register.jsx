import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice.js";
import { FaQuestion } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Register/Register.css";
import axios from "axios";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    firstName: "",
    surname: "",
    email: "",
    email2: "",
    password: "",
    password2: "",
    image: "",
  });

  const [userFile, setUserFile] = useState({
    file: [],
    filePreview: null,
  });

  const handleImageLoading = (e) => {
    const binaryData = [];
    const previewedImage = e.target.files[0];
    binaryData.push(previewedImage);

    if (previewedImage && previewedImage.size > 1e7) {
      toast.error("Oops! The size of image is larger than 10MB.");
      return (e.target.value = null);
    }

    setUserFile({
      ...userFile,
      file: previewedImage,
      filePreview: URL.createObjectURL(new Blob(binaryData)),
    });
  };

  const { firstName, surname, email, email2, password, password2 } = user;

  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth.user, navigate]);

  let errors = {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", userFile.file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dcfih6gcs/image/upload",
        data
      );
      const { url } = uploadRes.data;

      if (password !== password2) {
        toast.error("Password does not match!");
      } else if (email !== email2) {
        toast.error("Email does not match!");
      } else {
        const userData = {
          firstName,
          surname,
          email,
          password,
          image: url,
        };
        dispatch(registerUser(userData));
      }
    } catch (err) {
      throw new Error();
    }
  };
  if (auth.registerError.errors) {
    errors = auth.registerError.errors;
  }

  const setValues = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value.trim() }));
  };

  return (
    <>
      <ToastContainer />
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <div className="register-page">
            <h2 className="register-create-account">Create new account</h2>
            {auth.registerError && auth.registerError.message && (
              <div className="error-alert">{auth.registerError.message}</div>
            )}
            <div className="input-container">
              <div className="input-with-tip">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  className={`input-field ${
                    errors.firstName != null ? "invalid-input" : undefined
                  }`}
                  onChange={setValues}
                />
                <FaQuestion className="tip-icon" />
                <p className="tip">
                  First Name should be between 2 and 25 characters long.
                </p>
              </div>
              {errors.firstName != null && (
                <p className="error-text">{errors.firstName}</p>
              )}
            </div>
            <div className="input-container">
              <div className="input-with-tip">
                <input
                  type="text"
                  placeholder="Surname"
                  name="surname"
                  className={`input-field ${
                    errors.surname != null ? "invalid-input" : undefined
                  }`}
                  onChange={setValues}
                />
                <FaQuestion className="tip-icon" />
                <p className="tip">
                  Surname should be between 2 and 25 characters long.
                </p>
              </div>
              {errors.surname != null && (
                <p className="error-text">{errors.surname}</p>
              )}
            </div>
            <div className="input-container">
              <div className="input-with-tip">
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  className={`input-field ${
                    errors.email != null ? "invalid-input" : undefined
                  }`}
                  onChange={setValues}
                />
              </div>
              <div>
                {errors.email != null && (
                  <p className="error-text">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="input-container">
              <div className="input-with-tip">
                <input
                  type="email"
                  placeholder="Confirm Email address"
                  name="email2"
                  className={`input-field ${
                    errors.email != null ? "invalid-input" : undefined
                  }`}
                  onChange={setValues}
                />
              </div>
              <div>
                {errors.email != null && (
                  <p className="error-text">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="input-container">
              <div className="input-with-tip">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`input-field ${
                    errors.password != null ? "invalid-input" : undefined
                  }`}
                  onChange={setValues}
                />
                <FaQuestion className="tip-icon" />
                <p className="tip">
                  Password should be at least 8 characters. It must include 1
                  capital letter, 1 number, and 1 special character
                </p>
              </div>
              {errors.password != null && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>
            <div className="input-container">
              <div className="input-with-tip">
                <input
                  type="password"
                  name="password2"
                  placeholder="Repeat your password"
                  className={`input-field ${
                    errors.password != null ? "invalid-input" : undefined
                  }`}
                  onChange={setValues}
                />
              </div>
              {errors.password != null && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>
            <input
              className="input-container"
              type="file"
              name="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleImageLoading}
            />
            {userFile.filePreview !== null ? (
              <img
                className="image-preview"
                src={userFile.filePreview}
                alt=""
              />
            ) : null}

            <button className="btn-submit">
              {auth.registerStatus === "pending"
                ? "Submitting..."
                : "CREATE ACCOUNT"}
            </button>
            <p className="p-with-link">
              Already have an account? Please login&nbsp;
              <button
                type={"button"}
                className="btn-link"
                onClick={() => navigate("/login")}
              >
                <span className="register-here">here</span>.
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
