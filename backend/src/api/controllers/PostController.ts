import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/AuthMiddleware";
import { IPollPost } from "../models/Post";
import CommunityService from "../services/CommunityService";
import PostService from "../services/PostService";
import UserService from "../services/UserService";
import {
  BadRequestException,
  ForbiddenException,
  HttpExceptionHandler,
  NotFoundException,
} from "../utils/errors";

class PostController {
  // @Get('/post?community_id=string&author_id=string')
  static async getPosts(req: AuthenticatedRequest, res: Response) {
    try {
      let { community_id, author_id } = req.query;
      // If no query parameters are provided, return posts by user
      if (!community_id && !author_id) author_id = req.user.id;

      const posts = await PostService.getPostsByCommunityAndUser(
        // Cast as string to satisfy type checker (it's a string or undefined).
        // If undefined, it will be ignored in the query  (see PostService.ts)
        author_id as string,
        community_id as string
      );
      return res.status(200).json(posts);
    } catch (err) {
      return HttpExceptionHandler(err, req, res);
    }
  }

  // @Get('/post/:id')
  static async getPostById(req: AuthenticatedRequest, res: Response) {
    try {
      const post = await PostService.getPostById(req.params.id);
      if (!post) throw new NotFoundException("Post not found");
      return res.status(200).json(post);
    } catch (err) {
      return HttpExceptionHandler(err, req, res);
    }
  }

  // @Get('/post/feed')
  static async getFeed(req: AuthenticatedRequest, res: Response) {
    try {
      const communities = req.user.communities;
      if (!communities)
        throw new BadRequestException("You are not a member of any community");
      else if (communities.length === 0) return res.status(200).json([]);
      const posts = await PostService.getPostsByCommunities(communities);
      const user = await UserService.getPopulatedCommunities(req.user.id);
      return res.status(200).json({ posts, communities: user.communities });
    } catch (err) {
      return HttpExceptionHandler(err, req, res);
    }
  }

  // @Post('/post/')
  static async createPost(req: AuthenticatedRequest, res: Response) {
    try {
      // Check if community exists
      const community = await CommunityService.getCommunityById(req.body.community);
      if (!community) throw new NotFoundException("Community not found");
      // Check if user is a member of the community
      const isMember = community.members.includes(req.user.id);
      if (!isMember)
        throw new ForbiddenException("You are not a member of this community");
      // Create post
      const post = await PostService.createPost(req.user.id, req.body);
      return res.status(201).json(post);
    } catch (err) {
      return HttpExceptionHandler(err, req, res);
    }
  }

  // @Patch('/post/:id')
  static async updatePost(req: AuthenticatedRequest, res: Response) {
    try {
      const post = await PostService.getPostById(req.params.id);
      if (!post) throw new NotFoundException("Post not found");
      // Check if user is the author of the post
      if (post.author !== req.user.id)
        throw new ForbiddenException("You are not the author of this post");
      // Update post
      const updatedPost = await PostService.updatePost(req.params.id, req.body);
      return res.status(200).json(updatedPost);
    } catch (err) {
      return HttpExceptionHandler(err, req, res);
    }
  }

  // @Delete('/post/:id')
  static async deletePost(req: AuthenticatedRequest, res: Response) {
    try {
      const post = await PostService.getPostById(req.params.id);
      if (!post) throw new NotFoundException("Post not found");
      // Check if user is the author of the post
      if (post.author.toString() !== req.user.id)
        throw new ForbiddenException("You are not the author of this post");
      // Delete post
      await PostService.deletePost(req.params.id);
      return res.sendStatus(204);
    } catch (err) {
      return HttpExceptionHandler(err, req, res);
    }
  }

  // @Post('/post/:id/vote')
  static async votePost(req: AuthenticatedRequest, res: Response) {
    try {
      const post = await PostService.getPostById(req.params.id);
      if (!post) throw new NotFoundException("Post not found");
      // Check if user is a member of the community
      const community = await CommunityService.getCommunityById(post.community);
      const isMember = community.members.includes(req.user.id);
      if (!isMember)
        throw new ForbiddenException("You are not a member of this community");
      // Check if the post type is a poll
      if (post.type !== "poll") throw new BadRequestException("This post is not a poll");
      const optionIndex = post.options.findIndex((o) => o.value === req.body.option);
      if (optionIndex === -1)
        throw new BadRequestException(`${req.body.option} is not a valid option`);
      // Check if the user has already voted
      const hasVoted = post.options[optionIndex].votes.some((v) => v === req.user.id);
      if (!hasVoted) post.options[optionIndex].votes.push(req.user.id);
      // Update post
      const updatedPost = await PostService.updatePost(req.params.id, {
        options: post.options,
      });
      return res.status(200).json(updatedPost);
    } catch (err) {
      return HttpExceptionHandler(err, req, res);
    }
  }

  // @Post("/post/:id/rsvp")
  static async rsvpPost(req: AuthenticatedRequest, res: Response) {
    try {
      const post = await PostService.getPostById(req.params.id);
      if (!post) throw new NotFoundException("Post not found");
      // Check if user is a member of the community
      const community = await CommunityService.getCommunityById(post.community);
      const isMember = community.members.includes(req.user.id);
      if (!isMember)
        throw new ForbiddenException("You are not a member of this community");
      // Check if the post type is an event
      if (post.type !== "event")
        throw new BadRequestException("This post is not an event");
      // Check if the user has already RSVP'd
      const hasRSVPd = post.rsvp.some((r) => r.user_id === req.user.id);
      if (!hasRSVPd && post.max_capacity < post.rsvp.length) post.rsvp.push(req.user.id);
      // Update post
      const updatedPost = await PostService.updatePost(req.params.id, post);
      return res.status(200).json(updatedPost);
    } catch (err) {
      return HttpExceptionHandler(err, req, res);
    }
  }
}

export default PostController;
