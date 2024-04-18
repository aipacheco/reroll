import { Schema, model } from "mongoose"

const AddressSchema = new Schema(
  {
    streetAddress : {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    cp: {
      type: Number,
      required: true,
    },
  },


)

const Address = model("Address", AddressSchema)

export default Address
