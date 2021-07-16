import express from "express";

/** Controllers */
import { BrowseCtrl } from "../../controller";

const router = express.Router();

const API_V1_BROWSE = "/api/v1/browse";

router
  .route(`${API_V1_BROWSE}/new-releases/:country/:limit`)
  .get(BrowseCtrl.apiGetAListOfNewReleases);

export default router;
