import express from "express";
import { userAuth } from "../middlewares/auth.js";
import connectionRequest from "../models/connectionRequest.js";
import User from "../models/user.js";
const router = express.Router();

router.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    console.log("Here we go");
    const fromUserId = req.user._id;
    const { toUserId } = req.params;
    const { status } = req.params;
    console.log(fromUserId);
    console.log(toUserId);
    console.log(status);
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status type",
        status,
      });
    }
    const toUser = await User.findById(toUserId);
    console.log(toUser);
    if (!toUser) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const existingConnectionRequest = await connectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    console.log(existingConnectionRequest);
    if (existingConnectionRequest) {
      return res.status(400).json({
        message: "Connection Request Already Exists",
      });
    }
    const connectionReq = new connectionRequest({
      fromUserId,
      toUserId,
      status,
    });
    const data = await connectionReq.save();
    console.log("This is the thing you have been waiting for:", data);

    res.json({
      message: req.user.firstName + "is" + status + "in" + toUser.firstName,
      data,
    });
  } catch (error) {
    res.status(400).send("Error", error.message);
  }
});

router.post("/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;
    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Status not allowed",
      });
    }

    const ConnectionRequest = await connectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!ConnectionRequest) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: error.message,
      });
    }

    ConnectionRequest.status = status;
    const data = await ConnectionRequest.save();
    res.json({
      message: "Connection Request" + status,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default router;
