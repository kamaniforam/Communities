import express from "express";
import { body, param } from "express-validator";
import CommunityController from "../controllers/CommunityController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import RequestValidationHandler from "../middlewares/RequestValidationHandler";

const router = express.Router();

// @route   POST /community/
// @desc    Create community
// @access  Private
// @response codes  201, 400, 401
router.post(
  "/",
  body("name", "Name is a required parameter").not().isEmpty(),
  body("type", "Type is a required parameter").not().isEmpty(),
  RequestValidationHandler,
  AuthMiddleware,
  CommunityController.createCommunity
);

// @route   GET /community/:id
// @desc    Get community by id
// @access  Private
// @response codes  200, 400, 401, 404
router.get(
  "/:id",
  param("id", "Community id is a required parameter").not().isEmpty(),
  RequestValidationHandler,
  AuthMiddleware,
  CommunityController.getCommunityById
);

// @route   GET /community/type/:type
// @desc    Get communities by type
// @access  Private
// @response codes  200, 400, 401, 404
router.get(
  "/type/:type",
  param("type", "Community type is a required parameter").not().isEmpty(),
  RequestValidationHandler,
  AuthMiddleware,
  CommunityController.findByType
);

// @route   GET /community?search=string
// @desc    Get communities by query string
// @access  Private
// @response codes  200, 400, 401, 404
router.get("/", AuthMiddleware, CommunityController.getCommunities);

// @route   PUT /community/:id
// @desc    Update community
// @access  Private
// @response codes  200, 400, 401, 403, 404
router.patch(
  "/:id",
  param("id", "Community id is a required parameter").not().isEmpty(),
  RequestValidationHandler,
  AuthMiddleware,
  CommunityController.updateCommunity
);

// @route   GET /community/:id/join
// @desc    Join community
// @access  Private
// @response codes  200, 400, 401, 404
router.get(
  "/:id/join",
  param("id", "Community id is a required parameter").not().isEmpty(),
  RequestValidationHandler,
  AuthMiddleware,
  CommunityController.joinCommunity
);

export default router;
