import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dates: [
      {
        date: String,
        complete: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const habitModel = mongoose.model("habit", habitSchema);
