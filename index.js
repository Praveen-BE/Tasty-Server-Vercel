import express from "express";
import restaurantListRouter from "./routes/restaurantListAPI.js";
import restaurantMenuRouter from "./routes/restaurantMenuAPI.js";
import cors from "cors";
import dotenv from "dotenv";
import paymentRouter from "./routes/payment.js";
import connectDB from "./config/database.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT || 3333;
const app = express();

// app.use(cors({ origin: "https://tastyfood-0.web.app", credentials: true }));
app.use(cors({ origin: "http://localhost:1234", credentials: true }));

app.use(cookieParser());
app.use(express.json());

app.use("/", restaurantListRouter);
app.use("/", restaurantMenuRouter);
app.use("/", paymentRouter);
app.use("/", authRouter);
app.use("/", profileRouter);

connectDB()
  .then(() => {
    console.log("Database Connection established...");

    app.listen(PORT, (req, res) => {
      console.log(`APP run in Port No ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database cannot be Connected !!!");
  });
