import express from "express";

/** Controllers */
import AlbumCtrl from "../../controller/Album";

const router = express.Router();

router.route("/api/v1/albums/:id/tracks").get(AlbumCtrl.apiGetTracksById);

export default router;
