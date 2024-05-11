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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getAllUsers = exports.updateProfile = exports.getProfile = void 0;
const Services = __importStar(require("./services"));
const getProfile = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = request.params;
    try {
        const { data, error } = yield Services.getProfile(username);
        if (data) {
            return response.status(200).json({
                success: true,
                data,
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                message: "El usuario no existe",
                error: error,
            });
        }
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: "Error interno del servidor",
            details: error instanceof Error ? error.message : error,
        });
    }
});
exports.getProfile = getProfile;
const updateProfile = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = request.params;
    const { body } = request;
    const files = request.files;
    // console.log(body, userId, files)
    if (files) {
        try {
            const { data, error } = yield Services.updateProfile(body, username, files);
            if (error) {
                return response.status(400).json({
                    success: false,
                    message: error,
                });
            }
            if (data) {
                return response.status(201).json({
                    success: true,
                    data,
                    message: "Usuario modificado correctamente",
                });
            }
        }
        catch (error) {
            return response.status(500).json({
                success: false,
                message: "Error interno del servidor",
                details: error instanceof Error ? error.message : error,
            });
        }
    }
});
exports.updateProfile = updateProfile;
const getAllUsers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield Services.getAllUsers();
        if (data) {
            return response.status(200).json({
                success: true,
                data,
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                message: "No se han podido obtener los usuarios",
                error: error,
            });
        }
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: "Error interno del servidor",
            details: error instanceof Error ? error.message : error,
        });
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        const { data, error } = yield Services.deleteUser(id);
        if (data) {
            return response.status(200).json({
                success: true,
                data,
                message: "Usuario eliminado correctamente",
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                message: "No se ha podido eliminar el usuario",
                error: error,
            });
        }
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: "Error interno del servidor",
            details: error instanceof Error ? error.message : error,
        });
    }
});
exports.deleteUser = deleteUser;
