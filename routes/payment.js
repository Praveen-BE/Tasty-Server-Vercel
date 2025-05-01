import express from "express";
import instance from "../utils/razorpay.js";
import userAuth from "../middleware/auth.js";
import tastyPayment from "../models/tastyPayment.js";
import dotenv from "dotenv";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import tastyUserData from "../models/tastyUser.js";
const paymentRouter = express.Router();
dotenv.config();

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { firstName, lastName, emailId, _id } = req.user;
    const { membershipType } = req.body;
    const membershipAmount = { silver: 1, gold: 2 };
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

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.WEBHOOK_SECRETE
    );

    if (!isWebhookValid) {
      console.log("INvalid Webhook Signature");
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }
    console.log("Valid Webhook Signature");
    // if(req.body.event=="payment.captured"){
    // }
    // if(req.body.event=="payment.failed"){
    // }
    const paymendDetails = req.body.payload.payment.entity;
    const payment = await tastyPayment.findOne({
      OrderId: paymendDetails.order_id,
    });
    payment.status = paymendDetails.status;
    await payment.save();
    console.log("payment Saved");

    const user = await tastyUserData.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    console.log("User Saved");

    await user.save();

    return res.status(200).json({ msg: "Webhook Received Successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

paymentRouter.get("/premium/verify", userAuth, (req, res) => {
  const user = req.user;
  // console.log(user);
  res.send({
    firstName: user.firstName,
    lastName: user.lastName,
    emailId: user.emailId,
    userId: user._Id,
    isPremium: user.isPremium,
    membershipType: user.membershipType,
  });
});

export default paymentRouter;
