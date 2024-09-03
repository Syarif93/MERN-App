import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

class Authentication {
  public static async passwordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public static async passCompare(
    password: string,
    encriptedPass: string
  ): Promise<boolean> {
    const result = await bcrypt.compare(password, encriptedPass);

    return result;
  }

  public static generateToken(id: Types.ObjectId, email: string) {
    const jwtSecret: any = process.env.JWT_SECRET;
    const token: string = jwt.sign(
      {
        jti: id,
        email: email,
        iat: Math.floor(Date.now() / 1000),
      },
      jwtSecret,
      { expiresIn: "24h" }
    );

    return token;
  }
}

export default Authentication;
