import express from "express";

/** Controllers */
import { BrowseCtrl, AuthCtrl } from "../../controller";

const router = express.Router();

const API_V1_BROWSE = "/api/v1/browse";

router
  .route(`${API_V1_BROWSE}/new-releases/:country/:limit`)
  .get(AuthCtrl.ensureAuthenticated, BrowseCtrl.apiGetAListOfNewReleases);

export default router;
