import { NextFunction, Request, Response } from "express";

export default class AuthController {
  static async ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log("=> isAuthenticated", req.isAuthenticated());
    try {
      if (req.isAuthenticated()) {
        return next();
      }
      res.status(401);
      return next();
    } catch (err) {
      res.status(401);
      return next();
    }
  }
}
