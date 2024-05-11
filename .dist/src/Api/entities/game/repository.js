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
exports.buyGame = exports.reserveGame = exports.deleteGame = exports.updateGame = exports.getAllGames = exports.getSingleGame = exports.createGame = void 0;
const model_1 = __importDefault(require("../user/model"));
const model_2 = __importDefault(require("./model"));
const createGame = (userId, name, description, playersMin, playersMax, price, category, image1, image2, image3) => __awaiter(void 0, void 0, void 0, function* () {
    const newGame = yield model_2.default.create({
        author: userId,
        name: name,
        description: description,
        playersMin: playersMin,
        playersMax: playersMax,
        price: price,
        category: category,
        image1: image1,
        image2: image2,
        image3: image3,
    });
    const sellerEmail = yield model_1.default.findById(userId).select("email");
    if (!newGame) {
        return { error: "Error" };
    }
    return { data: newGame, userEmail: sellerEmail === null || sellerEmail === void 0 ? void 0 : sellerEmail.email };
});
exports.createGame = createGame;
const getSingleGame = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield model_2.default.findById(id).populate("author", "username");
    if (!game) {
        return { error: "Juego no encontrado" };
    }
    // console.log(game)
    return { data: game };
});
exports.getSingleGame = getSingleGame;
const getAllGames = () => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield model_2.default.find().populate("author", "username");
    if (!games) {
        return { error: "Juegos no encontrados" };
    }
    return { data: games };
});
exports.getAllGames = getAllGames;
const updateGame = (id, userId, name, description, playersMin, playersMax, price, category, image1Url, image2Url, image3Url) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield model_2.default.findById(id);
    if (!game) {
        throw new Error("Game not found");
    }
    const updatedGame = yield model_2.default.findOneAndUpdate({ _id: id, author: userId }, {
        name: name,
        description: description,
        playersMin: playersMin,
        playersMax: playersMax,
        price: price,
        category: category,
        image1: image1Url !== null ? image1Url : game.image1,
        image2: image2Url !== null ? image2Url : game.image2,
        image3: image3Url !== null ? image3Url : game.image3,
    }, { new: true });
    if (!updatedGame) {
        return {
            error: "Juego no encontrado o no tienes permiso para actualizarlo",
        };
    }
    return { data: updatedGame };
});
exports.updateGame = updateGame;
const deleteGame = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield model_2.default.findById(id);
    if (!game) {
        return { error: "Juego no encontrado" };
    }
    const seller = yield model_1.default.findById(game.author);
    if (!seller) {
        return { error: "Vendedor no encontrado" };
    }
    const sellerEmail = seller.email;
    const deletedGame = yield model_2.default.findByIdAndDelete(id);
    if (!deletedGame) {
        return { error: "No se ha podido borrar este juego" };
    }
    return { data: deletedGame, email: sellerEmail };
});
exports.deleteGame = deleteGame;
const reserveGame = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = yield model_2.default.findById(id);
        if (!game) {
            return { error: "Juego no encontrado" };
        }
        if (game.author.toString() !== userId.toString()) {
            return {
                error: "No puedes cambiar el estado de reserva del juego de otra persona",
            };
        }
        const newStatus = game.status === "Disponible" || game.status === "Vendido" ? "Reservado" : "Disponible";
        const updatedGame = yield model_2.default.findOneAndUpdate({ _id: id }, { status: newStatus }, { new: true });
        if (!updatedGame) {
            return { error: "No se ha podido cambiar el estado de reserva del juego" };
        }
        return { data: updatedGame };
    }
    catch (error) {
        console.error(error);
        return {
            error: "Ha ocurrido un error al intentar cambiar el estado de reserva del juego",
        };
    }
});
exports.reserveGame = reserveGame;
const buyGame = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = yield model_2.default.findById(id);
        if (!game) {
            return { error: "Juego no encontrado" };
        }
        if (game.author.toString() !== userId.toString()) {
            return {
                error: "No puedes cambiar el estado de venta del juego de otra persona",
            };
        }
        const newStatus = game.status === "Disponible" || game.status === "Reservado" ? "Vendido" : "Disponible";
        const updatedGame = yield model_2.default.findOneAndUpdate({ _id: id }, { status: newStatus }, { new: true });
        if (!updatedGame) {
            return { error: "No se ha podido cambiar el estado de venta del juego" };
        }
        return { data: updatedGame };
    }
    catch (error) {
        console.error(error);
        return {
            error: "Ha ocurrido un error al intentar cambiar el estado de reserva del juego",
        };
    }
});
exports.buyGame = buyGame;
