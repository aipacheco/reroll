import { GameData } from "../../types"

export const validName = (body: GameData) => {
  const { name } = body
  const invalid = (field: string, value: string, min: number, max: number) => {
    if (field.length < min) {
      return `${value}debe ser como mínimo ${min} caracteres.`
    }
    if (field.length > max) {
      return `${value} debe ser máximo de ${max} caracteres.`
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/.test(field)) {
      return `${value} solo debe contener letras.`
    }
  }
  const validationError: {
    invalid?: string
  } = { invalid: invalid(name, "categoría", 3, 20) }

  return validationError
}
