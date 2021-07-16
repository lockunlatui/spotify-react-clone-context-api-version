import { Request, Response, NextFunction } from "express";

import { BrowseDAO } from "../../../dao";

export default class BrowseController {
  static async apiGetAListOfNewReleases(
    req: Request,
    res: Response,
    _next: NextFunction
  ) {
    try {
      const { country, limit } = req.params;
      const data = await BrowseDAO.getAListOfNewReleases(country, limit);
      res.send({
        status: 200,
        data: data.data,
      });
    } catch (err) {
      res.send({
        data: err,
      });
    }
  }
}
