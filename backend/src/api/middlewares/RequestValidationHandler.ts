import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { BadRequestException, HttpExceptionHandler } from "../utils/errors";

const RequestValidationHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      throw new BadRequestException(validationErrors.array());
  } catch (err) {
    return HttpExceptionHandler(err, req, res);
  }
  next();
};

export default RequestValidationHandler;
