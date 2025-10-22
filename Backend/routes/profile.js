import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { validateProfileData } from "../utils/validation.js";
const router = express.Router();

router.get("/view", userAuth, async (req, res) => {
  try {
    console.log("Here we go");
    const user = req.user;
    res.send(user);
  } catch (error) {
    success: false,
      res.status(401).json({
        message: "Couldn't react upto the user",
        error: error.message,
      });
  }
});
//View logic
router.patch("/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("Please enter valid input ");
    }
    console.log("Hello");
    const loggedInUser = req.user;
    console.log(loggedInUser);
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json(loggedInUser);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default router;
