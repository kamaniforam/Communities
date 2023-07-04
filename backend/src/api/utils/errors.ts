import { Request, Response } from "express";

export class HttpException extends Error {
  status: number;
  error: string;
  errors?: Array<any>;

  constructor(status: number, message: string, errors?: Array<any>) {
    super(message);
    this.status = status;
    this.error = message;
    this.errors = errors;
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message);
  }
}

export class BadRequestException extends HttpException {
  constructor(err: string | Array<any> = "Bad request") {
    super(
      400,
      Array.isArray(err) ? "undefined" : err,
      Array.isArray(err) ? err : undefined
    );
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = "Unauthorized") {
    super(401, message);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string = "Forbidden") {
    super(403, message);
  }
}

export const HttpExceptionHandler = (error: Error, req: Request, res: Response) => {
  console.log("Error: ", error);
  if (!(error instanceof HttpException)) return res.status(500).json(error);
  const status = error.status || 500;
  return res.status(status).json({ message: error.message, errors: error.errors });
};
