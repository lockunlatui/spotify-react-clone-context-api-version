import express from "express";

/** Controllers */
import { PlayerCtrl } from "../../controller";

const router = express.Router();

/** GET */
router.route("/api/v1/me/player").get(PlayerCtrl.apiGetPlayer);
router
  .route("/api/v1/me/player/currently-playing")
  .get(PlayerCtrl.apiGetPlayerCurrentlyPlaying);
router
  .route("/api/v1/me/player/play/:deviceId")
  .get(PlayerCtrl.apiGetPlayerRecentlyPlayed);

/** PUT */
router
  .route("/api/v1/me/player/play/:deviceId")
  .put(PlayerCtrl.apiPutStartAndResume);
router.route("/api/v1/me/player/pause/:deviceId").put(PlayerCtrl.apiPutPause);

export default router;
