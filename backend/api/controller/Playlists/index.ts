import { NextFunction, Response, Request } from "express";

import { PlayListsDAO } from "../../../dao";

export default class PlaylistsController {
  static async apiGetPlayListsByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await PlayListsDAO.getPlayListsByUser(50);
      res.send({
        status: 200,
        data: data?.data,
      });
    } catch (err) {
      res.send({
        data: err,
      });
    }
  }
}
