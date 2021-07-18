import express from "express";

/** Controllers */
import { PlayerCtrl, AuthCtrl } from "../../controller";

const router = express.Router();

/** GET */
router
  .route("/api/v1/me/player")
  .get(AuthCtrl.ensureAuthenticated, PlayerCtrl.apiGetPlayer);
router
  .route("/api/v1/me/player/currently-playing")
  .get(AuthCtrl.ensureAuthenticated, PlayerCtrl.apiGetPlayerCurrentlyPlaying);
router
  .route("/api/v1/me/player/play/:deviceId")
  .get(AuthCtrl.ensureAuthenticated, PlayerCtrl.apiGetPlayerRecentlyPlayed);

/** PUT */
router
  .route("/api/v1/me/player/play/:deviceId")
  .put(AuthCtrl.ensureAuthenticated, PlayerCtrl.apiPutStartAndResume);
router
  .route("/api/v1/me/player/pause/:deviceId")
  .put(AuthCtrl.ensureAuthenticated, PlayerCtrl.apiPutPause);

export default router;
