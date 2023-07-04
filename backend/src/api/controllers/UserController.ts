import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/AuthMiddleware";
import UserService from "../services/UserService";
import { BadRequestException, NotFoundException } from "../utils/errors";
import { sendSMS } from "../utils/smsService";

class UserController {
  // @Post("/user/")
  static async createUser(req: Request, res: Response) {
    try {
      let user = await UserService.findByEmail(req.body.email);
      if (user)
        throw new BadRequestException("An account with that email already exists");
      user = await UserService.createUser(req.body);
      user.password = undefined; // Don't send password back to client
      sendSMS(
        "+1" + user.phone,
        `Hi ${user.name},\n\nThank you for signing up for Communities!`
      );
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  // @Get("/user/")
  static async getUser(req: AuthenticatedRequest, res: Response) {
    return res.status(200).json(req.user);
  }

  // @Get("/user/:id")
  static async getUserById(req: AuthenticatedRequest, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) throw new NotFoundException("User not found");
      user.password = undefined; // Don't send password back to client
      res.status(200).json(user);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  // @Patch("/user/")
  static async updateUser(req: AuthenticatedRequest, res: Response) {
    try {
      const user = await UserService.updateUser(req.user.id, req.body);
      user.password = undefined; // Don't send password back to client
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }

  // static async deleteUser(req: Request, res: Response) {
  //   try {
  //     const result = await UserService.deleteUser(req.params.id);
  //     res.status(204).json(result);
  //   } catch (err) {
  //     return res.status(400).json(err);
  //   }
  // }
}

export default UserController;
