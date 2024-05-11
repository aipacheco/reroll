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
const cloudinary_1 = require("cloudinary");
const Repository = __importStar(require("./repository"));
const utils_1 = require("./utils");
const createGame = (body, userId, files) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("en services", body, files)
    const { name, description, playersMin, playersMax, price, category } = body;
    const { image1, image2, image3 } = files;
    // console.log(files)
    const uploadImage = (image) => __awaiter(void 0, void 0, void 0, function* () {
        let resultUrl = "";
        yield new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream({ resource_type: "auto", folder: "reroll" }, (error, result) => {
                if (error)
                    reject(error);
                else if (result && result.url) {
                    resultUrl = result.url;
                    resolve(resultUrl);
                }
            })
                .end(image[0].buffer);
        });
        return resultUrl;
    });
    const [image1Url, image2Url, image3Url] = yield Promise.all([
        uploadImage(image1),
        uploadImage(image2),
        uploadImage(image3),
    ]);
    try {
        const invalidGame = (0, utils_1.validator)(body, "game");
        if (invalidGame) {
            return { error: invalidGame };
        }
        else {
            const { data, error, userEmail } = yield Repository.createGame(userId, name, description, playersMin, playersMax, price, category, image1Url, image2Url, image3Url);
            if (error) {
                return { error };
            }
            const emailResult = yield (0, utils_1.sendEmailOnCreate)(userEmail, data);
            if (emailResult === null || emailResult === void 0 ? void 0 : emailResult.error) {
                console.log("Error al enviar el correo electrónico:", emailResult.error);
                return { error: emailResult.error };
            }
            return { data };
        }
    }
    catch (error) {
        console.log(error);
        return { error: error };
    }
});
exports.createGame = createGame;
const getSingleGame = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield Repository.getSingleGame(id);
    if (error) {
        return { error };
    }
    return { data };
});
exports.getSingleGame = getSingleGame;
const getAllGames = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield Repository.getAllGames();
    if (error) {
        return { error };
    }
    return { data };
});
exports.getAllGames = getAllGames;
const updateGame = (id, body, files, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, playersMin, playersMax, price, category } = body;
    let { image1, image2, image3 } = files
        ? files
        : { image1: null, image2: null, image3: null };
    const uploadImage = (image) => __awaiter(void 0, void 0, void 0, function* () {
        if (!image)
            return null;
        let resultUrl = "";
        yield new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream({ resource_type: "auto", folder: "reroll" }, (error, result) => {
                if (error)
                    reject(error);
                else if (result && result.url) {
                    resultUrl = result.url;
                    resolve(resultUrl);
                }
            })
                .end(image[0].buffer);
        });
        return resultUrl;
    });
    const [image1Url, image2Url, image3Url] = yield Promise.all([
        uploadImage(image1),
        uploadImage(image2),
        uploadImage(image3),
    ]);
    const invalidGame = (0, utils_1.validator)(body, "game");
    if (invalidGame) {
        return { error: invalidGame };
    }
    else {
        const { data, error } = yield Repository.updateGame(id, userId, name, description, playersMin, playersMax, price, category, image1Url, image2Url, image3Url);
        if (error) {
            return { error };
        }
        return { data };
    }
});
exports.updateGame = updateGame;
const deleteGame = (id, reason) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error, email } = yield Repository.deleteGame(id);
    if (error) {
        return { error };
    }
    if (data) {
        const emailResult = yield (0, utils_1.sendEmailOnDelete)(email, reason, data);
        if (emailResult === null || emailResult === void 0 ? void 0 : emailResult.error) {
            console.log("Error al enviar el correo electrónico:", emailResult.error);
            return { error: emailResult.error };
        }
    }
    return { data };
});
exports.deleteGame = deleteGame;
const reserveGame = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield Repository.reserveGame(id, userId);
    if (error) {
        return { error };
    }
    return { data };
});
exports.reserveGame = reserveGame;
const buyGame = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield Repository.buyGame(id, userId);
    if (error) {
        return { error };
    }
    return { data };
});
exports.buyGame = buyGame;
