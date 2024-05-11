"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getAllUsers = exports.updateProfile = exports.getProfile = void 0;
const model_1 = __importDefault(require("../game/model"));
const model_2 = __importDefault(require("./model"));
const model_3 = __importDefault(require("../address/model"));
const mongoose_1 = require("mongoose");
const getProfile = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield model_2.default.findOne({ username }).select("-password");
    if (!userProfile) {
        return { error: "El usuario no existe" };
    }
    const userGames = yield model_1.default.find({
        author: userProfile._id,
    });
    const profileWithGames = Object.assign(Object.assign({}, userProfile.toObject()), { games: userGames });
    return { data: profileWithGames };
});
exports.getProfile = getProfile;
const updateProfile = (username, description, avatarUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield model_2.default.findOne({ username });
    if (!userProfile) {
        return { error: "El usuario no existe" };
    }
    const profileToUpdate = {
        description,
        avatar: avatarUrl,
    };
    const updatedProfile = yield model_2.default.findOneAndUpdate({ username }, profileToUpdate, { new: true });
    // console.log("en repository",updatedProfile)
    return { data: updatedProfile };
});
exports.updateProfile = updateProfile;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield model_2.default.find().select("-password");
    if (!allUsers) {
        return { error: "No hay usuarios" };
    }
    return { data: allUsers };
});
exports.getAllUsers = getAllUsers;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
        const userToDelete = yield model_2.default.findByIdAndDelete(id, { session });
        if ((userToDelete === null || userToDelete === void 0 ? void 0 : userToDelete.role) === "admin") {
            throw new Error("No puedes borrar a un administrador");
        }
        if (!userToDelete) {
            throw new Error("El usuario no existe");
        }
        else {
            yield model_1.default.deleteMany({ author: id }, { session });
            yield model_3.default.deleteMany({ owner: id }, { session });
        }
        yield session.commitTransaction();
        return { data: userToDelete };
    }
    catch (error) {
        yield session.abortTransaction();
        if (error instanceof Error) {
            return { error: error.message };
        }
        else {
            return { error: "Se produjo un error desconocido" };
        }
    }
    finally {
        session.endSession();
    }
});
exports.deleteUser = deleteUser;
