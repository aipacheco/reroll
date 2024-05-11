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
const Repository = __importStar(require("./repository"));
const cloudinary_1 = require("cloudinary");
const getProfile = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield Repository.getProfile(username);
    if (error) {
        return { error };
    }
    return { data };
});
exports.getProfile = getProfile;
const updateProfile = (body, username, files) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(body)
    const { description } = body;
    const { avatar } = files;
    const uploadImage = (image) => __awaiter(void 0, void 0, void 0, function* () {
        let resultUrl = "";
        if (image) {
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
                    .end(image.buffer);
            });
        }
        return resultUrl;
    });
    let avatarUrl;
    if (avatar && Array.isArray(avatar) && avatar.length > 0) {
        avatarUrl = yield uploadImage(avatar[0]);
    }
    const { data, error } = yield Repository.updateProfile(username, description, avatarUrl);
    if (error) {
        return { error };
    }
    return { data };
});
exports.updateProfile = updateProfile;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield Repository.getAllUsers();
    if (error) {
        return { error };
    }
    return { data };
});
exports.getAllUsers = getAllUsers;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield Repository.deleteUser(id);
    if (error) {
        return { error };
    }
    return { data };
});
exports.deleteUser = deleteUser;
