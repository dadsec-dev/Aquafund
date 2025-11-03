import { Router } from "express";
import userRoutes from "./user.route";
import projectRoutes from "./project.route";
import locationRoutes from "./location.route";

const router = Router();

router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/locations", locationRoutes);

export default router;


