"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ngo_controller_1 = __importDefault(require("../controllers/ngo.controller"));
const base_validation_1 = require("../utils/validation/base.validation");
const ngo_validation_1 = require("../utils/validation/ngo.validation");
const params_validation_1 = require("../utils/validation/params.validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const { create, list, getById, update, remove } = ngo_controller_1.default;
/**
 * @swagger
 * tags:
 *   name: NGO
 *   description: Manage non-governmental organizations
 */
/**
 * @swagger
 * /api/v1/ngos:
 *   post:
 *     summary: Register a new NGO
 *     tags: [NGO]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNgoInput'
 *     responses:
 *       201:
 *         description: NGO created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ngo'
 *       400:
 *         description: Validation error
 */
router.post("/ngos", auth_1.requireAuth, (0, base_validation_1.validate)(ngo_validation_1.createNgoSchema, "body"), create);
/**
 * @swagger
 * /api/v1/ngos:
 *   get:
 *     summary: List all NGOs
 *     tags: [NGO]
 *     responses:
 *       200:
 *         description: Array of NGOs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ngo'
 */
router.get("/ngos", list);
/**
 * @swagger
 * /api/v1/ngos/{id}:
 *   get:
 *     summary: Get NGO by ID
 *     tags: [NGO]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: NGO identifier
 *     responses:
 *       200:
 *         description: NGO details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ngo'
 *       404:
 *         description: NGO not found
 */
router.get("/ngos/:id", (0, base_validation_1.validate)(params_validation_1.idParamSchema, "params"), getById);
/**
 * @swagger
 * /api/v1/ngos/{id}:
 *   put:
 *     summary: Update NGO details
 *     tags: [NGO]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateNgoInput'
 *     responses:
 *       200:
 *         description: NGO updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: NGO not found
 */
router.put("/ngos/:id", auth_1.requireAuth, (0, base_validation_1.validate)(params_validation_1.idParamSchema, "params"), (0, base_validation_1.validate)(ngo_validation_1.updateNgoSchema, "body"), update);
/**
 * @swagger
 * /api/v1/ngos/{id}:
 *   delete:
 *     summary: Delete an NGO
 *     tags: [NGO]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: NGO deleted successfully
 *       404:
 *         description: NGO not found
 */
router.delete("/ngos/:id", auth_1.requireAuth, (0, base_validation_1.validate)(params_validation_1.idParamSchema, "params"), remove);
/**
 * @swagger
 * components:
 *   schemas:
 *     Ngo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         organizationName:
 *           type: string
 *         yearEstablished:
 *           type: integer
 *         countryOfOperation:
 *           type: string
 *         ngoIdentificationNumber:
 *           type: string
 *         emailAddress:
 *           type: string
 *         missionStatement:
 *           type: string
 *         websiteOrSocialLinks:
 *           type: string
 *         contactPersonName:
 *           type: string
 *           nullable: true
 *         contactPersonPosition:
 *           type: string
 *           nullable: true
 *         contactPersonPhoneNumber:
 *           type: string
 *           nullable: true
 *         contactPersonResidentialAddress:
 *           type: string
 *           nullable: true
 *         contactPersonEmailAddress:
 *           type: string
 *           nullable: true
 *         orgCountryOfOperation:
 *           type: string
 *           nullable: true
 *         orgEmailAddress:
 *           type: string
 *           nullable: true
 *         orgDescription:
 *           type: string
 *           nullable: true
 *         orgImages:
 *           type: array
 *           items:
 *             type: string
 *         connectedWallet:
 *           type: string
 *           nullable: true
 *         statusVerification:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *         userId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateNgoInput:
 *       allOf:
 *         - $ref: '#/components/schemas/Ngo'
 *       required:
 *         - organizationName
 *         - yearEstablished
 *         - countryOfOperation
 *         - ngoIdentificationNumber
 *         - emailAddress
 *         - missionStatement
 *         - websiteOrSocialLinks
 *     UpdateNgoInput:
 *       type: object
 *       description: Fields allowed when updating an NGO
 *       additionalProperties: false
 *       properties:
 *         organizationName:
 *           type: string
 *         yearEstablished:
 *           type: integer
 *         countryOfOperation:
 *           type: string
 *         ngoIdentificationNumber:
 *           type: string
 *         emailAddress:
 *           type: string
 *         missionStatement:
 *           type: string
 *         websiteOrSocialLinks:
 *           type: string
 *         contactPersonName:
 *           type: string
 *         contactPersonPosition:
 *           type: string
 *         contactPersonPhoneNumber:
 *           type: string
 *         contactPersonResidentialAddress:
 *           type: string
 *         contactPersonEmailAddress:
 *           type: string
 *         orgCountryOfOperation:
 *           type: string
 *         orgEmailAddress:
 *           type: string
 *         orgDescription:
 *           type: string
 *         orgImages:
 *           type: array
 *           items:
 *             type: string
 *         connectedWallet:
 *           type: string
 *         statusVerification:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 */
exports.default = router;
