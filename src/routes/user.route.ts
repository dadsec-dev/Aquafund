import { Router } from "express";
import userController from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth";
import { idParamSchema } from "../utils/validation/params.validation";
import { validate } from "../utils/validation/base.validation";
import { createUserSchema, updateUserSchema } from "../utils/validation/user.validation";


const router = Router();
const { create: createUser, listUsers: getAllUsers, getById: getUserById, updateUser: updateUser, removeUser: deleteUser } = userController;
router.post("/users", validate(createUserSchema, "body"), createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", validate(idParamSchema, "params"), getUserById);
router.put("/users/:id", validate(idParamSchema, "params"),   validate(updateUserSchema, "body"),updateUser);
router.delete("/users/:id", validate(idParamSchema, "params"), deleteUser);
export default router;
