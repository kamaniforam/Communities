import { Router } from "express";
import PostController from "../controllers/PostController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = Router();

// @route   POST /post/
// @desc    Create new post
// @access  Private
// @response codes  201, 400
router.post("/", AuthMiddleware, PostController.createPost);

// @route   GET /post/feed
// @desc    Get posts for user's feed
// @access  Private
// @response codes  200, 400, 401
router.get("/feed", AuthMiddleware, PostController.getFeed);

// @route   GET /post/:id
// @desc    Get post by id
// @access  Private
// @response codes  200, 400, 401, 403, 404
router.get("/:id", AuthMiddleware, PostController.getPostById);

// @route   GET /post?community_id=string&author_id=string
// @desc    Get posts
// @access  Private
// @response codes  200, 400, 401, 403, 404
router.get("/", AuthMiddleware, PostController.getPosts);

// @route   POST /post/:id/vote
// @desc    Vote on a poll post
// @access  Private
// @response codes  200, 400, 401, 403, 404
router.post("/:id/vote", AuthMiddleware, PostController.votePost);

// @route   POST /post/:id/rsvp
// @desc    RSVP an Event post
// @access  Private
// @response codes  200, 400, 401, 403, 404
router.post("/:id/rsvp", AuthMiddleware, PostController.rsvpPost);

// @route   PATCH /post/:id
// @desc    Update post
// @access  Private
// @response codes  200, 400, 401, 403, 404
router.patch("/:id", AuthMiddleware, PostController.updatePost);

// @route   DELETE /post/:id
// @desc    Delete post
// @access  Private
// @response codes  204, 400, 401, 403, 404
router.delete("/:id", AuthMiddleware, PostController.deletePost);

export default router;
