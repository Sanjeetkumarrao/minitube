import mongoose from "mongoose";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (channelId === req.user._id.toString()) {
    throw new ApiError(400, "Cannot subscribe to yourself");
  }

  const existingSub = await Subscription.findOne({
    subscriber: req.user._id,
    channel: channelId,
  });

  if (existingSub) {
    await Subscription.findByIdAndDelete(existingSub._id);
    return res.status(200).json(new ApiResponse(200, { isSubscribed: false }, "Unsubscribed"));
  }

  await Subscription.create({ subscriber: req.user._id, channel: channelId });
  return res.status(200).json(new ApiResponse(200, { isSubscribed: true }, "Subscribed"));
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  const subscribers = await Subscription.aggregate([
    { $match: { channel: new mongoose.Types.ObjectId(channelId) } },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",
        pipeline: [{ $project: { username: 1, fullName: 1, avatar: 1 } }],
      },
    },
    { $unwind: "$subscriber" },
    { $replaceRoot: { newRoot: "$subscriber" } },
  ]);

  return res.status(200).json(new ApiResponse(200, subscribers, "Subscribers fetched"));
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  const channels = await Subscription.aggregate([
    { $match: { subscriber: new mongoose.Types.ObjectId(subscriberId) } },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "channel",
        pipeline: [
          { $project: { username: 1, fullName: 1, avatar: 1 } },
        ],
      },
    },
    { $unwind: "$channel" },
    { $replaceRoot: { newRoot: "$channel" } },
  ]);

  return res.status(200).json(new ApiResponse(200, channels, "Subscribed channels fetched"));
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
