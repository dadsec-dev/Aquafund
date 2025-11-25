"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Aquafund API",
            version: "1.0.0",
            description: "API documentation for Aquafund-backend",
        },
        servers: [
            { url: "http://localhost:4000", description: "Development server" },
            { url: "https://aquafund.koyeb.app/", description: "Production server" },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ bearerAuth: [] }],
        paths: {},
    },
    apis: [
        path_1.default.join(__dirname, '../routes/**/*.ts'),
        path_1.default.join(__dirname, '../routes/**/*.js'),
        path_1.default.join(__dirname, '../controllers/**/*.ts'),
        path_1.default.join(__dirname, '../controllers/**/*.js'),
        path_1.default.join(__dirname, '../types/**/*.ts'),
        path_1.default.join(__dirname, '../types/**/*.js'),
    ],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
