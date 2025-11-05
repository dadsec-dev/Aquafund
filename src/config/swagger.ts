import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

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
    path.join(__dirname, '../routes/**/*.ts'),
    path.join(__dirname, '../routes/**/*.js'),
    path.join(__dirname, '../controllers/**/*.ts'),
    path.join(__dirname, '../controllers/**/*.js'),
    path.join(__dirname, '../types/**/*.ts'),
    path.join(__dirname, '../types/**/*.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
