import { Router } from "express";
import locationController from "../controllers/location.controller";

const router = Router();

router.post("/", (req, res) => locationController.create(req, res));
router.get("/", (req, res) => locationController.list(req, res));
router.get("/:id", (req, res) => locationController.getById(req, res));
router.put("/:id", (req, res) => locationController.update(req, res));
router.delete("/:id", (req, res) => locationController.remove(req, res));

export default router;


