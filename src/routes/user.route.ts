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
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     description: Creates a new user in the system. This route is public and does not require authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   id: "clx123abcde7890"
 *                   name: "John Doe"
 *                   email: "john@example.com"
 *                   wallet: "0x78385671254jdj72348"
 *                   companyName: "Acme Corp"
 *                   role: "USER"
 *                   createdAt: "2025-09-01T12:34:56Z"
 *                   updatedAt: "2025-09-01T12:34:56Z"
 *       400:
 *         description: Invalid request body
 *       409:
 *         description: Email or wallet already exists
 */
router.post("/users", validate(createUserSchema, "body"), createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     description: Returns a list of all users. Only accessible by admin.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   - id: "clx123abcde7890"
 *                     name: "John Doe"
 *                     email: "john@example.com"
 *                     wallet: "0x78385671254jdj72348"
 *                     companyName: "Acme Corp"
 *                     role: "USER"
 *                     createdAt: "2025-09-01T12:34:56Z"
 *                     updatedAt: "2025-09-01T12:34:56Z"
 *                   - id: "clx891xyz40999"
 *                     name: "Alice Smith"
 *                     email: "alice@example.com"
 *                     wallet: null
 *                     companyName: null
 *                     role: "ADMIN"
 *                     createdAt: "2025-09-02T12:34:56Z"
 *                     updatedAt: "2025-09-02T12:34:56Z"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 */
router.get("/users", getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     description: Retrieves a single user by ID. Accessible by the user themselves or admin.
 *     security:
 *       - bearerAuth: []
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
 *                   name: "John Doe"
 *                   email: "john@example.com"
 *                   wallet: "0x78385671254jdj72348"
 *                   companyName: "Acme Corp"
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
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [User]
 *     description: Updates a user’s information. Only the user or admin can update.
 *     security:
 *       - bearerAuth: []
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
 *                   name: "Updated Name"
 *                   email: "updated@example.com"
 *                   wallet: "0x78385671254jdj72348"
 *                   companyName: "Updated Corp"
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
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
 *     description: Deletes a user account. Only the user or admin can delete.
 *     security:
 *       - bearerAuth: []
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

export default router;
