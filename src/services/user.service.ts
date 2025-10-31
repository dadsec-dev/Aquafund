import prisma from "../prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Prisma, User } from "@prisma/client";

class UserService {
    // POST - /api/auth/register -Register a new user (donor or NGO).

    // POST - /api/auth/login - Authenticate user and return JWT token.

    // GET - /api/users - (Admin only) List all users.

    // GET - /api/users/:id - Get details of a single user by ID.

    // PUT - /api/users/:id - Update user information.

    // DELETE - /api/users/:id - Delete a user account (admin only).

    // PATCH - /api/users/:id/verify - Update user verification status (verified, pending, etc.).
    
    
}

export default new UserService();
