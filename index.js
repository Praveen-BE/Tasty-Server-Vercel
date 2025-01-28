import express from "express";
import restaurantListRouter from "./routes/restaurantListAPI.js";
import restaurantMenuRouter from "./routes/restaurantMenuAPI.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3333;
const app = express();

app.use(cors({ origin: "http://localhost:1234", credentials: true }));

app.use(express.json());

app.use("/", restaurantListRouter);
app.use("/", restaurantMenuRouter);

app.listen(PORT, (req, res) => {
  console.log(`APP run in Port No ${PORT}`);
});
