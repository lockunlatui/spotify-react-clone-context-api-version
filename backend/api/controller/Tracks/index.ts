import { Request, Response, NextFunction } from "express";

import { TracksDAO } from "../../../dao";

export default class TracksController {
  static async apiGetTrackById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const data = await TracksDAO.getTrackById(id);
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
