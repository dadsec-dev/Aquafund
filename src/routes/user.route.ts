import { Router } from "express";
import userController from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth";
import { idParamSchema, walletParamSchema } from "../utils/validation/params.validation";
import { validate } from "../utils/validation/base.validation";
import { createUserSchema, updateUserSchema } from "../utils/validation/user.validation";


const router = Router();
const { create: createUser, listUsers: getAllUsers, getById: getUserById, updateUser: updateUser, removeUser: deleteUser, getByWallet:getUserByWallet } = userController;

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
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               wallet:
 *                 type: string
 *                 nullable: true
 *                 example: "0xA8fB91e47cB94c2F805454543b19AfF23e29c1"
 *               companyName:
 *                 type: string
 *                 nullable: true
 *                 example: "Garry Technology"
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *                 example: "USER"
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             examples:
 *               success:
 *                 value:
 *                   id: "clx7f8392k3pa01q3v9b20d8c"
 *                   name: "John doe"
 *                   email: "Johndoe@example.com"
 *                   wallet: "0xA8fB91e47cB94c2F805454543b19AfF23e29c1"
 *                   companyName: "Garry Technology"
 *                   role: "USER"
 *                   createdAt: "2025-11-05T12:34:56Z"
 *                   updatedAt: "2025-11-05T12:34:56Z"
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
 * api/v1/users/{id}:
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
 * /api/v1/users/wallet/{wallet}:
 *   get:
 *     summary: Get user by wallet address
 *     tags: [User]
 *     description: Retrieves a user using their wallet address. Accessible by the user themselves or admin.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: address
 *         in: path
 *         required: true
 *         description: The wallet address of the user
 *         schema:
 *           type: string
 *           example: "0x53d284357ec70cE289D6D64134DfAc8E511c8a3D
"
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   id: "clx123abcde7890"
 *                   name: "John Doe "
 *                   email: "johndoe@example.com"
 *                   wallet: "0x53d284357ec70cE289D6D64134DfAc8E511c8a3D
 *                   companyName: "Garry Technology"
 *                   role: "ADMIN"
 *                   createdAt: "2025-09-01T12:34:56Z"
 *                   updatedAt: "2025-09-01T12:34:56Z"
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not allowed
 *       404:
 *         description: User not found
 */
router.get("/users/wallet/:wallet", validate(walletParamSchema, "params"), getUserByWallet);



/**
 * @swagger
 * api/v1/users/{id}:
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
 * api/v1/users/{id}:
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


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         wallet:
 *           type: string
 *           nullable: true
 *         companyName:
 *           type: string
 *           nullable: true
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
