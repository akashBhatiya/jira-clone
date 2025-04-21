import mongoose from "mongoose";
import * as Types from "../../Types";

const userSchema = new mongoose.Schema<Types.IUser>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "pm", "tm", "user"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<Types.IUser>("User", userSchema);

export default User;
