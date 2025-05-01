import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "TastyUser",
      required: true,
    },
    paymentId: {
      type: String,
    },
    OrderId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
      required: true,
    },
    notes: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      emailId: {
        type: String,
      },
      membershipType: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("TastyPayment", paymentSchema);
