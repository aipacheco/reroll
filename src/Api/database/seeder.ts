import fs from "fs"
import path from "path"
import mongoose from "mongoose"
import User from "../entities/user/model"
import Game from "../entities/game/model"
import Category from "../entities/category/model"
import dotenv from "dotenv"
dotenv.config()

export const seed = async (rutaArchivo: string, modelo: any) => {
  const data = fs.readFileSync(rutaArchivo, "utf-8")

  const objetos = JSON.parse(data)

  for (const objeto of objetos) {
    // transformar los campos a los tipos correctos
    if (objeto._id && objeto._id.$oid) {
      objeto._id = new mongoose.Types.ObjectId(objeto._id.$oid)
    }
    if (objeto.createdAt && objeto.createdAt.$date) {
      objeto.createdAt = new Date(objeto.createdAt.$date)
    }
    if (objeto.updatedAt && objeto.updatedAt.$date) {
      objeto.updatedAt = new Date(objeto.updatedAt.$date)
    }
    if (objeto.author && objeto.author.$oid) {
      objeto.author = new mongoose.Types.ObjectId(objeto.author.$oid)
    }
    if (objeto.category && objeto.category.$oid) {
      objeto.category = new mongoose.Types.ObjectId(objeto.category.$oid)
    }

    await modelo.create(objeto)
  }

  console.log(
    `La operación de sembrado para el archivo ${rutaArchivo} se ha completado.`
  )
}

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(async () => {
    // limpiar la base de datos
    await Promise.all([
      User.deleteMany({}),
      Game.deleteMany({}),
      Category.deleteMany({}),
    ])

    const archivosModelos = [
      { ruta: "./Json/test.users.json", modelo: User },
      { ruta: "./Json/test.games.json", modelo: Game },
      { ruta: "./Json/test.categories.json", modelo: Category },
    ]

    for (const { ruta, modelo } of archivosModelos) {
      const rutaAbsoluta = path.join(__dirname, ruta)
      seed(rutaAbsoluta, modelo).catch(console.error)
    }
  })
  .catch((error) =>
    console.error("Error al conectar a la base de datos:", error)
  )
