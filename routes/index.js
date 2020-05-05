import express from "express";

import gameRoute from "./game.route.js";
import userRoute from "./user.route.js";
import languageRoute from "./language.route.js";
import statusRoute from "./status_route.js";
import testRoute from "./test.route.js";

const router = express.Router();

router.use("/game", gameRoute);
router.use("/user", userRoute);
router.use("/contract", languageRoute);
router.use("/status", statusRoute);

router.use("/test", testRoute);

export default router;
