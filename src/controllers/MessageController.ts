import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import MessageModel from "../models/MessageModel";

class MessageController {
  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const users = await MessageModel.find();

      return res.status(200).json(
        apiResponse({
          message: "Success",
          data: users,
        })
      );
    } catch (error) {
      return res.status(500).json(
        apiResponse({
          data: error,
        })
      );
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { email, date, description } = req.body;

    try {
      const message = await MessageModel.create({
        email,
        date,
        description,
      });

      return res.status(201).json(
        apiResponse({
          message: "Success",
          data: message,
        })
      );
    } catch (error) {
      return res.status(500).json(
        apiResponse({
          data: error,
        })
      );
    }
  }
}

export default new MessageController();
