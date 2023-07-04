import express from "express";
import bcrypt from "bcryptjs";
import UserService from "../services/UserService";
import { IUserDoc } from "../models/User";
import { UnauthorizedException } from "../utils/errors";

export interface AuthenticatedRequest extends express.Request {
  user?: IUserDoc;
}

export default async function (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.header("authorization");

  if (!token) {
    return res
      .status(401)
      .json({ error: "Authentication required to access this route" });
  }

  try {
    const encoded = token.split(" ")[1];
    const decoded = Buffer.from(encoded, "base64").toString();
    const [username, password] = decoded.split(":");

    let user = await UserService.findByEmail(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      user.password = undefined;
      req.user = user;
      next();
    } else throw new UnauthorizedException("Invalid credentials");
  } catch (err) {
    return res.status(401).json({ error: "Invalid authentication token" });
  }
}
