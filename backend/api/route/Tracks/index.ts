import express from "express";

import { TracksCtrl, AuthCtrl } from "../../controller";

const router = express.Router();

router
  .route("/api/v1/tracks/:id")
  .get(AuthCtrl.ensureAuthenticated, TracksCtrl.apiGetTrackById);

export default router;
