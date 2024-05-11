"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    try {
        if (req.tokenData.role !== "admin") {
            return res.status(401).json({
                success: false,
                message: "UNAUTHORIZED",
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "You dont have permisions",
        });
    }
};
exports.isAdmin = isAdmin;
