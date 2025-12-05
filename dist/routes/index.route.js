"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const project_route_1 = __importDefault(require("./project.route"));
const location_route_1 = __importDefault(require("./location.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const web3Auth_route_1 = __importDefault(require("./web3Auth.route"));
const ngo_route_1 = __importDefault(require("./ngo.route"));
const router = (0, express_1.Router)();
router.use("/v1", user_route_1.default);
router.use("/v1", project_route_1.default);
router.use("/v1", location_route_1.default);
router.use("/v1", auth_route_1.default);
router.use("/auth", web3Auth_route_1.default); // Web3 auth routes at /api/auth/*
router.use("/v1", ngo_route_1.default);
exports.default = router;
