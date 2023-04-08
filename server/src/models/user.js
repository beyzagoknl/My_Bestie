import mongoose from "mongoose";
import { PASSWORD_REGEX, EMAIL_REGEX } from "../util/constants.js";

const userSchema = new mongoose.Schema(
  {
    // The name should be unique, the length should be a minimum of 5 characters,
    // and a maximum of 15 characters, and does not contain special characters or white spaces
    firstName: {
      type: String,
      required: [true, "First name is required"],
      min: [2, "First name must be at least 2 characters"],
      max: [25, "First name must be at most 25 characters"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
      min: [2, "Surname must be at least 2 characters"],
      max: [25, "Surname must be at most 25 characters"],
    },

    // The email should be in the form of example@organization.org
    email: {
      type: String,
      required: [true, "Email Address is required"],
      immutable: true,
      unique: true,
      validate: {
        validator: (v) => {
          return EMAIL_REGEX.test(v);
        },
        message: "invalid email address",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      min: [true, "Passwword should be at least 8 characters"],
      validate: {
        validator: (v) => {
          return PASSWORD_REGEX.test(v);
        },
        message: "Password is too weak",
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
