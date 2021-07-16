import { Request, Response, NextFunction } from "express";

import AlbumDao from "../../../dao/Album";

export default class AlbumController {
  static async apiGetTracksById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { id } = req.params;
    const data = await AlbumDao.getAnAlbumsTracks(id);
    console.log("data", data);
  }
}
