import { PASSWORD_REGEX, EMAIL_REGEX } from "./constants.js";

export const validateFirstNameLength = (v) => {
  if (v.length >= 2 && v.length <= 25) {
    return true;
  }
  return false;
};
export const validateSurnameLength = (v) => {
  if (v.length >= 2 && v.length <= 25) {
    return true;
  }
  return false;
};

export const validatePasswordLength = (v) => {
  if (v.length >= 8) {
    return true;
  }
  return false;
};

export const validateEmailAddress = (v) => {
  return EMAIL_REGEX.test(v);
};

export const validatePasswordStrength = (v) => {
  return PASSWORD_REGEX.test(v);
};

export const validateUser = (user) => {
  let errors = {};
  // validate first name
  if (!validateFirstNameLength(user.firstName)) {
    errors.firstName = "First name should be between 2 and 25 characters.";
  }
  // validate surname
  if (!validateSurnameLength(user.surname)) {
    errors.surname = "Surname should be between 2 and 25 characters.";
  }
  // validate password
  if (!validatePasswordLength(user.password)) {
    errors.password = "Password is too short. Should be at least 8 characters";
  } else if (!validatePasswordStrength(user.password)) {
    errors.password =
      "Password is too weak. Should include 1 Capital letter, 1 number, and 1 special character.";
  }

  // validate email address
  if (!validateEmailAddress(user.email)) {
    errors.email =
      "Email address should contain @ sign. Only dot (.), and underscore (_) are allowed as special characters";
  }

  return errors;
};
