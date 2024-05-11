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
exports.buyGame = exports.reserveGame = exports.deleteGame = exports.updateGame = exports.getAllGames = exports.getSingleGame = exports.createGame = void 0;
const Service = __importStar(require("./services"));
const createGame = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("las files", request.files)
    const { userId } = request.tokenData;
    const { body } = request;
    const files = request.files;
    if (files) {
        try {
            const { data, error } = yield Service.createGame(body, userId, files);
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
                    message: "Anuncio creado correctamente",
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
exports.createGame = createGame;
const getSingleGame = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        const { data, error } = yield Service.getSingleGame(id);
        if (data) {
            return response.status(200).json({
                success: true,
                data,
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                message: "El juego no existe",
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
exports.getSingleGame = getSingleGame;
const getAllGames = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield Service.getAllGames();
        if (data) {
            return response.status(200).json({
                success: true,
                data,
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                message: "No hay juegos disponibles",
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
exports.getAllGames = getAllGames;
const updateGame = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = request.tokenData;
    const { id } = request.params;
    const { body } = request;
    const files = request.files;
    try {
        const { data, error } = yield Service.updateGame(id, body, files, userId);
        if (data) {
            return response.status(200).json({
                success: true,
                data,
                message: "Anuncio actualizado correctamente",
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                message: "No tienes permisos para actualizar este anuncio",
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
exports.updateGame = updateGame;
const deleteGame = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { reason } = request.body;
    try {
        const { data, error } = yield Service.deleteGame(id, reason);
        if (data) {
            return response.status(200).json({
                success: true,
                data,
                message: "Anuncio eliminado correctamente",
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                message: "No tienes permisos para eliminar este anuncio",
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
exports.deleteGame = deleteGame;
const reserveGame = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = request.tokenData;
    const { id } = request.params;
    try {
        const { data, error } = yield Service.reserveGame(id, userId);
        if ((data === null || data === void 0 ? void 0 : data.status) === "Reservado") {
            return response.status(200).json({
                success: true,
                data,
                message: "Juego marcado como reservado",
            });
        }
        if ((data === null || data === void 0 ? void 0 : data.status) === "Disponible") {
            return response.status(200).json({
                success: true,
                data,
                message: "Juego marcado como disponible",
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                message: "No se ha podido marcar el juego como reservado",
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
exports.reserveGame = reserveGame;
const buyGame = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = request.tokenData;
    const { id } = request.params;
    try {
        const { data, error } = yield Service.buyGame(id, userId);
        if ((data === null || data === void 0 ? void 0 : data.status) === "Vendido") {
            return response.status(200).json({
                success: true,
                data,
                message: "Juego marcado como vendido",
            });
        }
        if ((data === null || data === void 0 ? void 0 : data.status) === "Disponible") {
            return response.status(200).json({
                success: true,
                data,
                message: "Juego marcado como disponible",
            });
        }
        if (error) {
            return response.status(400).json({
                success: false,
                message: "No se ha podido marcar el juego como vendido",
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
exports.buyGame = buyGame;
