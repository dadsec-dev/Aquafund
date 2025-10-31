import prisma from "../prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Prisma, User } from "@prisma/client";

class DonationService {

    // POST - /api/donations - Record a new donation (after blockchain confirmation).

    // GET - /api/donations - List all donations (admin use).

    // GET - /api/donations/:projectId - Get donations for a specific project.

    // GET - /api/donations/user/:userId - Get donation history for a specific donor.
    
    // GET - /api/donations/tx/:txHash - Retrieve donation details by blockchain transaction hash.
    
    

}