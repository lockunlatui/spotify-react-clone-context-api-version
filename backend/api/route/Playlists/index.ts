import express from "express";

import { PlaylistsCtrl } from "../../controller";

const router = express.Router();

router.route("/api/v1/me/playlists").get(PlaylistsCtrl.apiGetPlayListsByUser);

export default router;
