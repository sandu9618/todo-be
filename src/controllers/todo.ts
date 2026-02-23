import { Request, Response } from "express";
import { Types } from "mongoose";
import Todo from "../models/todo.model.js";

const getUserId = (req: Request): string => (req as any).user.id;

export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const todos = await Todo.find({ userId: new Types.ObjectId(userId) }).sort({ createdAt: -1 });
    return res.status(200).json(todos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTodosByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const todos = await Todo.find({ userId: new Types.ObjectId(userId) }).sort({ createdAt: -1 });
    return res.status(200).json(todos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const { title } = req.body;
    const todo = await Todo.create({ userId: new Types.ObjectId(userId), title });
    return res.status(201).json(todo);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;
    const { title, completed } = req.body;

    if (title === undefined && completed === undefined) {
      return res.status(400).json({ message: "At least one of title or completed is required" });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.userId.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    await todo.save();

    return res.status(200).json(todo);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.userId.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await Todo.findByIdAndDelete(id);
    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
