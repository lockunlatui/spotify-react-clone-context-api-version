import express from "express";

import { PlaylistsCtrl, AuthCtrl } from "../../controller";

const router = express.Router();

router
  .route("/api/v1/me/playlists")
  .get(AuthCtrl.ensureAuthenticated, PlaylistsCtrl.apiGetPlayListsByUser);

export default router;
