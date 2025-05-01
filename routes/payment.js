import express from "express";
import instance from "../utils/razorpay.js";
import userAuth from "../middleware/auth.js";
import tastyPayment from "../models/tastyPayment.js";
import dotenv from "dotenv";
const paymentRouter = express.Router();
dotenv.config();

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { firstName, lastName, emailId, _id } = req.user;
    const { membershipType } = req.body;
    const membershipAmount = { silver: 2, gold: 5 };
    const order = await instance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });
    // console.log(order);
    const payment = new tastyPayment({
      userId: _id,
      OrderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();
    res.json({ ...savedPayment.toJSON(), keyId: process.env.KEY_ID });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

export default paymentRouter;
