import express from "express";
import bcrypt from "bcrypt";
// import { getJWT, validatePassword } from "../models/tastyUser.js";
import { validateSignUpData, validateSignInData } from "../utils/validation.js";

import tastyUserData from "../models/tastyUser.js";
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // console.log(req.body);
    validateSignUpData(req);

    // Encrypt the Password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    const userData = new tastyUserData({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    const saveUser = await userData.save();
    const token = await saveUser.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 3600000),
      sameSite: "None",
      httpOnly: true,
      secure: true,
    });
    // const user = await tastyUserData.findOne({ emailId: emailId });
    res.json({
      message: "User Added Successfully",
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        emailId: userData.emailId,
        userId: userData._Id,
        isPremium: userData.isPremium,
        membershipType: userData.membershipType,
      },
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    // validate signin data
    validateSignInData(req);

    const { emailId, password } = req.body;
    const user = await tastyUserData.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credintials...");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // create a jwt token
      const token = await user.getJWT();
      if (!token) {
        return res.status(401).send("Please Login !");
      }
      // add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 3600000),
        sameSite: "None",
        httpOnly: true,
        secure: true,
      });
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        isPremium: user.isPremium,
        membershipType: user.membershipType,
      });
    } else {
      throw new Error("Invalid Credintials...");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logout Successfully...");
});

export default authRouter;
