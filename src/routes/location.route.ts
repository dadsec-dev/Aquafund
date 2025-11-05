import { Router } from "express";
import locationController from "../controllers/location.controller";
import { requireAuth } from "../middleware/auth";
import { idParamSchema } from "../utils/params.validation";
import { validate } from "../utils/base.validation";
import { createLocationSchema, updateLocationSchema } from "../utils/location.validation";


const router = Router();

const {
  create: createLocation,
  list: getAllLocations,
  getById: getLocationById,
  update: updateLocation,
  remove: deleteLocation,
} = locationController;

router.post(
  "/locations",
  // requireAuth,
  validate(createLocationSchema, "body"),
  createLocation
);
router.get("/locations", getAllLocations);
router.get("/locations/:id", validate(idParamSchema, "params"), getLocationById);
router.put(
  "/locations/:id",
  // requireAuth,
  validate(idParamSchema, "params"),
  validate(updateLocationSchema, "body"),
  updateLocation
);
router.delete("/locations/:id", validate(idParamSchema, "params"), deleteLocation);

export default router;
