import express from "express";
import userAuth from "../middleware/auth.js";
import tastyUserData from "../models/tastyUser.js";
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send({
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId,
      userId: user._Id,
      isPremium: user.isPremium,
      membershipType: user.membershipType,
    });
  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
});

profileRouter.get("/unsubscribe", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const userData = await tastyUserData.findOne({ emailId: user.emailId });
    // console.log(userData);
    if (
      userData?.membershipType == "gold" ||
      userData?.membershipType == "silver"
    ) {
      // console.log(userData?.membershipType);
      userData.membershipType = null;
      await userData.save();
      // console.log(userData?.membershipType);
    }

    res.send({
      firstName: userData.firstName,
      lastName: userData.lastName,
      emailId: userData.emailId,
      userId: userData._Id,
      isPremium: userData.isPremium,
      membershipType: userData.membershipType,
    });
  } catch (err) {
    res.status(401).send("Error : " + err.message);
  }
});

export default profileRouter;
