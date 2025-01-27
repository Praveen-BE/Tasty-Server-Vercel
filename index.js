import express from "express";
import restaurantListRouter from "./routes/restaurantListAPI.js";
import restaurantMenuRouter from "./routes/restaurantMenuAPI.js";
import cors from "cors";
// Backend Local host
const PORT = 3333;
const app = express();

//frontend local host
app.use(cors({ origin: "http://localhost:1234", credentials: true }));

app.use(express.json());

app.use("/", restaurantListRouter);
app.use("/", restaurantMenuRouter);

app.listen(PORT, (req, res) => {
  console.log(`APP run in Port No ${PORT}`);
});
