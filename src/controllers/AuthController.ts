import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { apiResponse } from "../utils/apiResponse";
import Authentication from "../utils/Authentication";

class AuthController {
  public async register(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      const hashPassword: string = await Authentication.passwordHash(password);
      const user = await UserModel.create({
        name,
        email,
        password: hashPassword,
      });

      return res.status(201).json(
        apiResponse({
          message: "Pendaftaran berhasil silahkan login",
          data: user,
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

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      const passCompare = await Authentication.passCompare(
        password,
        user.password
      );

      if (passCompare) {
        user.lastLogin = new Date();
        user.save();
        const token = Authentication.generateToken(user._id, user.email);

        return res.status(200).json(
          apiResponse({
            message: "Success!",
            data: { token },
          })
        );
      }

      return res.status(401).json(
        apiResponse({
          message: "Wrong credential",
        })
      );
    }

    return res.status(401).json(
      apiResponse({
        message: "Wrong credential",
      })
    );
  }
}

export default new AuthController();
