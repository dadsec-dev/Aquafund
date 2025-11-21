import { Router } from "express";
import ngoController from "../controllers/ngo.controller";
import { validate } from "../utils/validation/base.validation";
import { createNgoSchema, updateNgoSchema } from "../utils/validation/ngo.validation";
import { idParamSchema } from "../utils/validation/params.validation";
const router = Router();
const { create, list, getById, update, remove } = ngoController;

router.post("/ngos", validate(createNgoSchema, "body"), create);
router.get("/ngos", list);
router.get("/ngos/:id", validate(idParamSchema, "params"), getById);
router.put("/ngos/:id", validate(idParamSchema, "params"), validate(updateNgoSchema, "body"), update);
router.delete("/ngos/:id", validate(idParamSchema, "params"), remove);

export default router;
