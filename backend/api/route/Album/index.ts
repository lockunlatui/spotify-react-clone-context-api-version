import express from "express";

/** Controllers */
import { AlbumCtrl, AuthCtrl } from "../../controller";

const router = express.Router();

router
  .route("/api/v1/albums/:id/tracks")
  .get(AuthCtrl.ensureAuthenticated, AlbumCtrl.apiGetTracksById);

export default router;
