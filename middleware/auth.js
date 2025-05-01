import pkg from "jsonwebtoken";
import tastyUserData from "../models/tastyUser.js";

const { verify } = pkg;
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies || {};
    // console.log(token);

    if (!token) {
      throw new Error("Token is Not Valid !");
    }

    const decodedObj = await verify(token, "DEV@Tinder$790");
    const { _id } = decodedObj;

    const user = await tastyUserData.findById(_id);

    if (!user) {
      throw new Error("User Not Found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

export default userAuth;
