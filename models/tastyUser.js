import mongoose from "mongoose";
import dotenv from "dotenv";
// import { defaultProfile, defaultAbout } from "../utils/constant.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();
// const mongoDbUri = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      maxLength: 25,
      index: true,
    },
    lastName: {
      type: String,
      maxLength: 25,
    },
    emailId: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      set: (v) => v.replace(/\s\s+/g, ""),
      maxLength: 100,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email Address : " + value);
        }
      },
    },
    password: {
      type: String,
      require: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is Weak : " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 16,
    },
    photoUrl: {
      type: String,
      default:
        "https://th.bing.com/th?q=Default+Profile+Avatar+PNG&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL : " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the User",
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid Gender type`,
      },
      // validate(value){
      //     if(!["male","female", "others"].includes(value)){
      //         throw new Error("Gender data is not Valid !");
      //     }
      // },
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    membershipType: {
      type: String,
      default: null,
    },
    favoriteFood: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, process.env.JWT_MIX, {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

const tastyUserData = mongoose.model("TastyUser", userSchema);
export default tastyUserData;

// const connection = mongoose.createConnection(mongoDbUri);
// const users = connection.model('users', userSchema);
