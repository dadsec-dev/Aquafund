import { Router } from "express";
import userController from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth";
import { idParamSchema } from "../utils/validation/params.validation";
import { validate } from "../utils/validation/base.validation";
import { createUserSchema, updateUserSchema } from "../utils/validation/user.validation";

const router = Router();
const { create: createUser, listUsers: getAllUsers, getById: getUserById, updateUser: updateUser, removeUser: deleteUser } = userController;

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */
/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Register a new user 
 *     tags: [NGO]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "supersecret"
 *               role:
 *                 type: string
 *                 enum: [ NGO, USER, ADMIN,]
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email is already registered."
 *       500:
 *         description: Server error while creating user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */
router.post("/users", validate(createUserSchema, "body"), createUser);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     description: Returns a list of all users. Only accessible by admin.
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   - id: "clx123abcde7890"
 *                     email: "john@example.com"
 *                     role: "USER"
 *                     createdAt: "2025-09-01T12:34:56Z"
 *                     updatedAt: "2025-09-01T12:34:56Z"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 */
router.get("/users", getAllUsers);

/**
 * @swagger
 * api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     description: Retrieves a single user by ID. Accessible by the user themselves or admin.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   id: "clx123abcde7890"
 *                   email: "john@example.com"
 *                   role: "USER"
 *                   createdAt: "2025-09-01T12:34:56Z"
 *                   updatedAt: "2025-09-01T12:34:56Z"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not allowed
 *       404:
 *         description: User not found
 */
router.get("/users/:id", validate(idParamSchema, "params"), getUserById);

/**
 * @swagger
 * api/v1/users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [User]
 *     description: Updates a user’s information. Only the user or admin can update.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   id: "clx123abcde7890"
 *                   email: "updated@example.com"
 *                   role: "ADMIN"
 *                   createdAt: "2025-09-01T12:34:56Z"
 *                   updatedAt: "2025-09-05T09:21:32Z"
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not allowed
 *       404:
 *         description: User not found
 */
router.put("/users/:id", validate(idParamSchema, "params"),   validate(updateUserSchema, "body"),updateUser);

/**
 * @swagger
 * api/v1/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
 *     description: Deletes a user account. Only the user or admin can delete.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   message: "User deleted successfully"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not allowed
 *       404:
 *         description: User not found
 */
router.delete("/users/:id", validate(idParamSchema, "params"), deleteUser);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           writeOnly: true
 *         role:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export default router;
