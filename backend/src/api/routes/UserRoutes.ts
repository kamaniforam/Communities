import { Router } from "express";
import { body, param } from "express-validator";

import UserController from "../controllers/UserController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import RequestValidationHandler from "../middlewares/RequestValidationHandler";

const router = Router();

// @route   POST /user/
// @desc    Create new user
// @access  Public
// @response codes  201, 400
router.post(
  "/",
  body("name", "Name is a required parameter").not().isEmpty(),
  body("email", "Email is a required parameter").not().isEmpty(),
  body("password", "Password is a required parameter").not().isEmpty(),
  body("phone", "Phone is a required parameter").not().isEmpty(),
  body("email", "Email is not valid").isEmail(),
  body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  body("phone", "Phone is not valid").isLength({ min: 10 }),
  RequestValidationHandler,
  UserController.createUser
);

// @route   GET /user/
// @desc    Get currently logged in user
// @access  Private
// @response codes  200, 400, 401
router.get("/", AuthMiddleware, UserController.getUser);

// @route   GET /user/:id
// @desc    Get user by id
// @access  Private
// @response codes  200, 400, 401, 403, 404
router.get(
  "/:id",
  param("id", "User id is a required parameter").not().isEmpty(),
  RequestValidationHandler,
  AuthMiddleware,
  UserController.getUserById
);

// @route   PATCH /user/
// @desc    Update user
// @access  Private
// @response codes  200, 400, 401
router.patch("/", AuthMiddleware, UserController.updateUser);

// @route   DELETE /user/:id
// @desc    Delete user
// @access  Private
// @response codes  204, 400
// router.delete(
//   "/:id",
//   param("id", "User id is a required parameter").not().isEmpty(),
//   RequestValidationHandler,
//   UserController.deleteUser
// );

export default router;
