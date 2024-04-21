import { Files, GameData } from "../../types"
import { v2 as cloudinary } from "cloudinary"
// import { UploadApiResponse } from "cloudinary"
import * as Repository from "./repository"

export const createGame = async (body: GameData, files: Files) => {
  const { name, playersMin, playersMax, category } = body //sacar también el id del usuario que pone a la venta
  const { images } = files

  // array para almacenar las URLs
  let imageUrls: string[] = []

  try {
    const uploadPromises = images.map(
      (image) =>
        new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "reroll" }, (error, result) => {
              if (error) {
                console.error("Error uploading image:", error)
                reject(error)
              } else {
                if (result?.url) {
                  // almacenar la URL en el array
                  imageUrls.push(result.url)
                  resolve(result.url)
                } else {
                  reject("No URL returned")
                }
              }
            })
            .end(image.buffer)
        })
    )

    await Promise.all(uploadPromises)

    // console.log("Las URLs finales:", imageUrls)
    // Aquí puedes llamar al Repository, pasándole el resto de campos del Game y las imágenes (imageUrls)
    const { data, error } = await Repository.createGame(
      name,
      playersMin,
      playersMax,
      category,
      imageUrls
    )
    if (error) {
      return { error }
    }
    return { data }
  } catch (error) {
    return { error: "Error uploading images to Cloudinary" }
  }
}
