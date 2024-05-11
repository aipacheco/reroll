"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller = __importStar(require("./controller"));
const auth_1 = require("../../middlewares/auth");
const isAdmin_1 = require("../../middlewares/isAdmin");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const gameRouter = express_1.default.Router();
gameRouter.post("/", upload.fields([
    { name: "name", maxCount: 1 },
    { name: "description", maxCount: 1 },
    { name: "playersMin", maxCount: 1 },
    { name: "playersMax", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "price", maxCount: 1 },
]), auth_1.auth, Controller.createGame);
gameRouter.get("/:id", Controller.getSingleGame);
gameRouter.get("/", Controller.getAllGames);
gameRouter.put("/:id", upload.fields([
    { name: "name", maxCount: 1 },
    { name: "description", maxCount: 1 },
    { name: "playersMin", maxCount: 1 },
    { name: "playersMax", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "price", maxCount: 1 },
]), auth_1.auth, Controller.updateGame);
gameRouter.delete("/:id", auth_1.auth, isAdmin_1.isAdmin, Controller.deleteGame);
gameRouter.put("/reserve/:id", auth_1.auth, Controller.reserveGame);
gameRouter.put("/sell/:id", auth_1.auth, Controller.buyGame);
exports.default = gameRouter;
