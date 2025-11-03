import { Router } from "express";
import locationController from "../controllers/location.controller";

const router = Router();

const {
  create: createLocation,
  list: getAllLocations,
  getById: getLocationById,
  update: updateLocation,
  remove: deleteLocation,
} = locationController;

router.post("/", createLocation);
router.get("/", getAllLocations);
router.get("/:id", getLocationById);
router.put("/:id", updateLocation);
router.delete("/:id", deleteLocation);

export default router;


