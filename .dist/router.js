"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("./entities/auth/routes"));
const routes_2 = __importDefault(require("./entities/category/routes"));
const routes_3 = __importDefault(require("./entities/game/routes"));
const routes_4 = __importDefault(require("./entities/user/routes"));
const routes_5 = __importDefault(require("./entities/address/routes"));
const routes_6 = __importDefault(require("./entities/transaction/routes"));
const router = (0, express_1.Router)();
router.use("/auth", routes_1.default);
router.use("/category", routes_2.default);
router.use("/game", routes_3.default);
router.use("/user", routes_4.default);
router.use("/address", routes_5.default);
router.use("/transaction", routes_6.default);
exports.default = router;
