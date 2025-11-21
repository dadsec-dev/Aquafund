import { Router } from "express";
import userRoutes from "./user.route";
import projectRoutes from "./project.route";
import locationRoutes from "./location.route";
import authRoute from "./auth.route"
import ngoRoutes from "./ngo.route";
const router = Router();

router.use("/v1", userRoutes);
router.use("/v1", projectRoutes);
router.use("/v1", locationRoutes);
router.use("/v1", authRoute)
router.use("/v1", ngoRoutes);

export default router;