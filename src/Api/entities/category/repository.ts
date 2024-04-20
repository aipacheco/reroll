import Category from "./model"

export const createCategory = async (name: string) => {
  const existingName = await Category.findOne({ name: name }).exec()
  if (existingName) {
    return { error: "La categoría ya existe" }
  }
  const categoryCreated = await Category.create({name:name})
  return { data: categoryCreated }
}
