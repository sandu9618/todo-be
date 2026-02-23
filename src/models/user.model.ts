import { model, Schema } from "mongoose";
import { Roles } from "../enum/role.enum.js";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  salt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, enum: Roles, default: Roles.USER },
});

const User = model("User", userSchema);

export default User;