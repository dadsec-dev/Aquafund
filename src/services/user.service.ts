import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaClient, Prisma, User } from "@prisma/client";

const prisma = new PrismaClient();

class UserService {
    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        try {
            const user = await prisma.user.create({ data });
            return user;
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new Error("A user with the provided unique field already exists");
                }
            }
            throw error;
        }
    }

    async listUsers(): Promise<User[]> {
        const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
        return users;
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        return user;
    }

    async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        try {
            const updated = await prisma.user.update({ where: { id }, data });
            return updated;
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new Error("User not found");
                }
                if (error.code === "P2002") {
                    throw new Error("Update would violate a unique constraint");
                }
            }
            throw error;
        }
    }

    async deleteUser(id: string): Promise<User> {
        try {
            const deleted = await prisma.user.delete({ where: { id } });
            return deleted;
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new Error("User not found");
                }
            }
            throw error;
        }
    }
}

export default new UserService();
