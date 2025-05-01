import validator from "validator";
// import { ALLOWED_UPDATES } from "./constant";

const ALLOWED_UPDATES = [
  "firstName",
  "lastName",
  "photoUrl",
  "about",
  "gender",
  "age",
  "favoriteFood",
];

export const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not Valid !");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("First Name should be 4 to 50 Characters");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is Not Valid !");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter Strong Password...");
  }
};

export const validateSignInData = (req) => {
  const { emailId, password } = req.body;

  if (!validator.isEmail(emailId)) {
    throw new Error("Email is Not Valid !");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter the Valid Password");
  }
};

export const validateEditProfileData = (req) => {
  const isEditAllowed = Object.keys(req.body).every((field) =>
    ALLOWED_UPDATES.includes(field)
  );

  return isEditAllowed;
};
