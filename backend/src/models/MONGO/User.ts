import mongoose from "mongoose";
import * as Types from "../../Types";

const userSchema = new mongoose.Schema<Types.IUser>(
  {
    uid: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
    },
    photoURL: {
      type: String,
    },
    provider: {
      type: String,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "pm", "tm", "user"],
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive", "pending"],
    },
    invitedby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<Types.IUser>("User", userSchema);

export default User;
