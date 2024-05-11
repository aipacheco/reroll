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
exports.seed = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const model_1 = __importDefault(require("../entities/user/model"));
const model_2 = __importDefault(require("../entities/game/model"));
const model_3 = __importDefault(require("../entities/category/model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const seed = (rutaArchivo, modelo) => __awaiter(void 0, void 0, void 0, function* () {
    const data = fs_1.default.readFileSync(rutaArchivo, "utf-8");
    const objetos = JSON.parse(data);
    for (const objeto of objetos) {
        // transformar los campos a los tipos correctos
        if (objeto._id && objeto._id.$oid) {
            objeto._id = new mongoose_1.default.Types.ObjectId(objeto._id.$oid);
        }
        if (objeto.createdAt && objeto.createdAt.$date) {
            objeto.createdAt = new Date(objeto.createdAt.$date);
        }
        if (objeto.updatedAt && objeto.updatedAt.$date) {
            objeto.updatedAt = new Date(objeto.updatedAt.$date);
        }
        if (objeto.author && objeto.author.$oid) {
            objeto.author = new mongoose_1.default.Types.ObjectId(objeto.author.$oid);
        }
        if (objeto.category && objeto.category.$oid) {
            objeto.category = new mongoose_1.default.Types.ObjectId(objeto.category.$oid);
        }
        yield modelo.create(objeto);
    }
    console.log(`La operación de sembrado para el archivo ${rutaArchivo} se ha completado.`);
});
exports.seed = seed;
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    // limpiar la base de datos
    yield Promise.all([
        model_1.default.deleteMany({}),
        model_2.default.deleteMany({}),
        model_3.default.deleteMany({}),
    ]);
    const archivosModelos = [
        { ruta: "./Json/test.users.json", modelo: model_1.default },
        { ruta: "./Json/test.games.json", modelo: model_2.default },
        { ruta: "./Json/test.categories.json", modelo: model_3.default },
    ];
    for (const { ruta, modelo } of archivosModelos) {
        const rutaAbsoluta = path_1.default.join(__dirname, ruta);
        (0, exports.seed)(rutaAbsoluta, modelo).catch(console.error);
    }
}))
    .catch((error) => console.error("Error al conectar a la base de datos:", error));
