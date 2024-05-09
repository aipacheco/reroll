export const validator = (value: any, type: string) => {
  const regexName = /^[a-zA-Z0-9 áéíóúÁÉÍÓÚ]+$/

  switch (type) {
    case "name": {
      if (!regexName.test(value)) {
        return `El nombre tiene que estar formado por caracteres correctos (sólo números y letras).`
      }
      if (value.length < 3) {
        return `El nombre tiene que ser mínimo de 3 letras.`
      }
      if (value.length > 50) {
        return `El nombre tiene que ser máximo 50 letras.`
      }
      return ""
    }
    case "description": {
      //si es mayor de 180 letras
      if (value.length > 180) {
        return `la descripción tiene que ser máximo 180 caracteres.`
      }
      return ""
    }
    case "price": {
      if (value < 0) {
        return "El precio no puede ser negativo."
      }
      return ""
    }
    case "playersMin": {
      if (value < 1) {
        return "El número mínimo de jugadores no puede ser inferior a 1."
      }
      return ""
    }
    case "playersMax": {
      if (value < 1) {
        return "El número máximo de jugadores no puede ser inferior a 1."
      }
      return ""
    }

    default:
      console.log("pues ok")
  }
}
