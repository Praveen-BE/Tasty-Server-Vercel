import express from "express";
import userAuth from "../middleware/auth.js";
// const { validateEditProfileData } = require("../utils/validation");
// import TastyUser from "../models/tastyUser";
// const bcrypt = require("bcrypt");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send({
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId,
      userId: user._Id,
    });
  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
});

export default profileRouter;
