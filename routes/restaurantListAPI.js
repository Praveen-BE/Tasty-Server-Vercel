import express from "express";
import bangalore from "../minifiedFiles/minifiedRestaurantList.js";

const restaurantListRouter = express.Router();

restaurantListRouter.get("/restuarantList/:page", async (req, res) => {
  try {
    const paramValue = req.params.page;
    const PageNo = parseInt(paramValue) - 1 || 0;
    res.json(bangalore[PageNo]);
  } catch (error) {
    res.json({ data: { message: error.message } });
  }
});

export default restaurantListRouter;
