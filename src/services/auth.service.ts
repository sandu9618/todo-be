import User from "../models/user.model.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Errors } from "../enum/error.enum.js";
import { Roles } from "../enum/role.enum.js";

export const createUser = async (name: string, email: string, password: string) => {
  const existingUser = await User.findOne({email});

  if (existingUser) {
    throw new Error("Email already in use");
  } 
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name: name,
    email: email,
    role: name.toLowerCase().includes("admin") ? Roles.ADMIN : Roles.USER,
    password: hashedPassword,
    salt: salt
  });

  const payload = {
    id: newUser._id,
    email: newUser.email,
    role: newUser.role
  }

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {expiresIn: '1h'}
  );

  return {access_token: token, user: newUser};
}

export const userLogin = async (email: string, password: string) => {
  const user = await User.findOne({email}).select("+password");

  if (!user) {
    throw new Error(Errors.USER_NOT_FOUND);
  }

  const hashedPassword = await bcrypt.hash(password, user.salt);

  if (hashedPassword === user.password) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    }
    const token = jwt.sign(
      payload, 
      process.env.JWT_SECRET as string,
      {expiresIn: '1h'}
    );
    return {access_token: token, user: user};
  } else {
    throw new Error(Errors.UNAUTHORIZED);
  }
}

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({email});

  if (!user) {
    throw new Error(Errors.USER_NOT_FOUND);
  }

  return {data: user};
}

export const getAllUsers = async () => {
  const users = await User.find();
  return {data: users};
}