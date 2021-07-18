import express from "express";

import { UsersCtrl, AuthCtrl } from "../../controller";

const router = express.Router();

router
  .route("/api/v1/me")
  .get(AuthCtrl.ensureAuthenticated, UsersCtrl.apiGetMe);

router.route("/api/v1/auth/spotify").get(UsersCtrl.apiAuthSpotify);

router
  .route("/api/v1/auth/spotify/callback")
  .get(UsersCtrl.apiAuthSpotifyCallback);

router.route("/api/v1/health").get(UsersCtrl.apiGetHealth);

router.route("/api/v1/logout").get(UsersCtrl.apiLogout);
export default router;
