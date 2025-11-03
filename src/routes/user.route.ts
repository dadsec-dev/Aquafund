import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

const { create: createUser, listUsers: getAllUsers, getById: getUserById, updateUser: updateUser, removeUser: deleteUser } = userController;

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;