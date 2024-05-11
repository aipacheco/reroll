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
exports.deleteAddress = exports.updateAddress = exports.getAddressById = exports.getAddressByUser = exports.createAddress = void 0;
const Service = __importStar(require("./services"));
const createAddress = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = request;
    const { userId } = request.tokenData;
    try {
        const { data, error } = yield Service.createAddress(body, userId);
        if (data) {
            return response.status(201).json({
                success: true,
                data,
                message: "Dirección creada correctamente",
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                message: error,
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
exports.createAddress = createAddress;
const getAddressByUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = request.tokenData;
    try {
        const { data, error } = yield Service.getAddressByUser(userId);
        if (data) {
            return response.status(200).json({
                success: true,
                data,
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                message: error,
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
exports.getAddressByUser = getAddressByUser;
const getAddressById = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        const { data, error } = yield Service.getAddressById(id);
        if (data) {
            return response.status(200).json({
                success: true,
                data,
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                message: error,
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
exports.getAddressById = getAddressById;
const updateAddress = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { body } = request;
    const { userId } = request.tokenData;
    try {
        const { data, error } = yield Service.updateAddress(id, body, userId);
        if (data) {
            return response.status(200).json({
                success: true,
                data,
                message: "Dirección actualizada correctamente",
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                message: error,
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
exports.updateAddress = updateAddress;
const deleteAddress = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { userId } = request.tokenData;
    try {
        const { data, error } = yield Service.deleteAddress(id, userId);
        if (data) {
            return response.status(200).json({
                success: true,
                message: "Dirección eliminada correctamente",
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                message: error,
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
exports.deleteAddress = deleteAddress;
