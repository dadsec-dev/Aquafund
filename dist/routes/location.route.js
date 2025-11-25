"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const location_controller_1 = __importDefault(require("../controllers/location.controller"));
const params_validation_1 = require("../utils/validation/params.validation");
const base_validation_1 = require("../utils/validation/base.validation");
const location_validation_1 = require("../utils/validation/location.validation");
const router = (0, express_1.Router)();
const { create: createLocation, list: getAllLocations, getById: getLocationById, update: updateLocation, remove: deleteLocation, } = location_controller_1.default;
/**
 * @swagger
 * /api/v1/locations:
 *   post:
 *     summary: Create a new location
 *     tags: [Location]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *               - city
 *               - state
 *               - country
 *             properties:
 *               address:
 *                 type: string
 *                 example: "12 Adebayo Street, Lekki Phase 1"
 *               city:
 *                 type: string
 *                 example: "Lagos"
 *               state:
 *                 type: string
 *                 example: "Lagos State"
 *               country:
 *                 type: string
 *                 example: "Nigeria"
 *               latitude:
 *                 type: number
 *                 nullable: true
 *                 example: 6.5244
 *               longitude:
 *                 type: number
 *                 nullable: true
 *                 example: 3.3792
 *     responses:
 *       201:
 *         description: Location successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Invalid location data
 *       500:
 *         description: Server error while creating location
 */
router.post("/locations", 
// requireAuth,
(0, base_validation_1.validate)(location_validation_1.createLocationSchema, "body"), createLocation);
/**
 * @swagger
 * /api/v1/locations:
 *   get:
 *     summary: Get all locations
 *     tags: [Location]
 *     responses:
 *       200:
 *         description: List of locations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       500:
 *         description: Failed to fetch locations
 */
router.get("/locations", getAllLocations);
/**
 * @swagger
 * /api/v1/locations/{id}:
 *   get:
 *     summary: Get a location by ID
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "clx9120as12po01j2n0f4s9da"
 *     responses:
 *       200:
 *         description: Location found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 *       500:
 *         description: Failed to retrieve location
 */
router.get("/locations/:id", (0, base_validation_1.validate)(params_validation_1.idParamSchema, "params"), getLocationById);
/**
 * @swagger
 * /api/v1/locations/{id}:
 *   put:
 *     summary: Update an existing location
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "clx9120as12po01j2n0f4s9da"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *           example:
 *             city: "Abuja"
 *             state: "FCT"
 *             latitude: 9.0574
 *             longitude: 7.4898
 *     responses:
 *       200:
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Invalid update payload
 *       404:
 *         description: Location not found
 *       500:
 *         description: Failed to update location
 */
router.put("/locations/:id", 
// requireAuth,
(0, base_validation_1.validate)(params_validation_1.idParamSchema, "params"), (0, base_validation_1.validate)(location_validation_1.updateLocationSchema, "body"), updateLocation);
/**
 * @swagger
 * /api/v1/locations/{id}:
 *   delete:
 *     summary: Delete a location
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "clx9120as12po01j2n0f4s9da"
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Location removed."
 *       404:
 *         description: Location not found
 *       500:
 *         description: Failed to delete location
 */
router.delete("/locations/:id", (0, base_validation_1.validate)(params_validation_1.idParamSchema, "params"), deleteLocation);
/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         country:
 *           type: string
 *         latitude:
 *           type: number
 *           nullable: true
 *         longitude:
 *           type: number
 *           nullable: true
 */
exports.default = router;
