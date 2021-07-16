import { Request, Response, NextFunction } from "express";

import { PlayerDAO } from "../../../dao";

export default class PlayerController {
  static async apiGetPlayer(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await PlayerDAO.getPlayer();
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

  static async apiGetPlayerCurrentlyPlaying(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await PlayerDAO.getPlayerCurrentlyPlaying();
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

  static async apiGetPlayerRecentlyPlayed(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { limit } = req.query;
      const data = await PlayerDAO.getPlayerRecentlyPlayed(limit);
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

  static async apiPutStartAndResume(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { deviceId } = req.params;
    const { spotifyUri, position } = req.body;
    const data = await PlayerDAO.putStartAndResume(
      deviceId,
      spotifyUri,
      position
    );
    if (data.status === 204) {
      res.send({
        status: 204,
      });
    } else {
      res.send({
        status: data.status,
      });
    }
  }

  static async apiPutPause(req: Request, res: Response, next: NextFunction) {
    try {
      const { deviceId } = req.params;
      const data = await PlayerDAO.putPause(deviceId);
      res.send({
        status: 200,
        data: data,
      });
    } catch (err) {
      res.send({
        data: err,
      });
    }
  }
}
