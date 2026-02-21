import { Request, Response } from "express";
import { createUser, getUserByEmail, userLogin } from "../services/auth.service.js";
import { Errors } from "../enum/error.enum.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const response = await createUser(name, email, password);
    return res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;
    const response = await userLogin(email, password);
    return res.status(200).json(response);
  } catch (error: any) {
    if (error.message === Errors.USER_NOT_FOUND) {
      return res.status(404).json({message: "User not found"})
    } else if (error.message === Errors.UNAUTHORIZED) {
      return res.status(401).json({message: "Unauthorized"})
    } else {
      return res.status(500).json({message: error.message})
    }
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const {email} = req.body;
    const response = await getUserByEmail(email);
    return res.status(200).json(response);
  } catch (error: any) {
    if (error.message === Errors.USER_NOT_FOUND) {
      return res.status(404).json({message: 'User not found'})
    } else {
      return res.status(500).json({message: error.message});
    }
  }
}