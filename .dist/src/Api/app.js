"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const cors_1 = __importDefault(require("cors"));
const cloudinary_1 = require("cloudinary");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const multer = require("multer");
const storage = multer.memoryStorage(); // permite que los archivos se almacenen en memoria
const upload = multer({ storage: storage });
exports.app.get("/hello", (req, res) => {
    res.status(200).json({ success: true, msg: "server is running" });
});
exports.app.use("/api", router_1.default);
