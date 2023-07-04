import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/AuthMiddleware";
import CommunityService from "../services/CommunityService";
import {
  BadRequestException,
  HttpExceptionHandler,
  NotFoundException,
  UnauthorizedException,
} from "../utils/errors";
import { sendSMS } from "../utils/smsService";

class CommunityController {
  // @Post("/community/")
  static async createCommunity(req: AuthenticatedRequest, res: Response) {
    try {
      let community = await CommunityService.findByName(req.body.name);
      if (community)
        throw new BadRequestException("A community with that name already exists");
      community = await CommunityService.createCommunity(req.user.id, req.body);
      return res.status(201).json(community);
    } catch (err) {
      return HttpExceptionHandler(err, req, res);
    }
  }

  // @Get("/community/:id")
  static async getCommunityById(req: AuthenticatedRequest, res: Response) {
    try {
      const community = await CommunityService.getPopulatedCommunityById(req.params.id);
      if (!community) throw new NotFoundException("Community not found");
      res.status(200).json(community);
    } catch (err) {
      console.log(err);
      return HttpExceptionHandler(err, req, res);
    }
  }

  // @Get("/community/type/:type")
  static async findByType(req: AuthenticatedRequest, res: Response) {
    try {
      const community = await CommunityService.findByType(req.params.type);
      if (!community) throw new NotFoundException("No Communities in that category");
      res.status(200).json(community);
    } catch (err) {
      return HttpExceptionHandler(err, req, res);
    }
  }

  // @Get("/community?search=term")
  static async getCommunities(req: AuthenticatedRequest, res: Response) {
    try {
      const searchTerm = req.query.search as string;
      let communities = [];
      // If search term is provided, query communities by name
      if (searchTerm) communities = await CommunityService.queryCommunities(searchTerm);
      // Otherwise, return all communities
      else communities = await CommunityService.getCommunities();
      res.status(200).json(communities);
    } catch (err) {
      return HttpExceptionHandler(err, req, res);
    }
  }

  // @Patch("/community/:id")
  static async updateCommunity(req: AuthenticatedRequest, res: Response) {
    try {
      let community = await CommunityService.getCommunityById(req.params.id);
      // Check if community exists
      if (!community) throw new NotFoundException("Community not found");
      // Check if user is a moderator
      if (community.moderators.indexOf(req.user.id) === -1)
        throw new UnauthorizedException("Only moderators can update communities");
      community = await CommunityService.updateCommunity(req.params.id, req.body);
      res.status(200).json(community);
    } catch (err) {
      return HttpExceptionHandler(err, req, res);
    }
  }

  // @Get("/community/:id/join")
  static async joinCommunity(req: AuthenticatedRequest, res: Response) {
    try {
      const { community, user } = await CommunityService.joinCommunity(
        req.user.id,
        req.params.id
      );
      sendSMS(
        user.phone,
        `Welcome to ${community.name}!\n\nGet back online and start posting`
      );
      res.status(200).json({ community, user });
    } catch (err) {
      return HttpExceptionHandler(err, req, res);
    }
  }
}

export default CommunityController;
