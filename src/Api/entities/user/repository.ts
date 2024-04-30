import Game from "../game/model"
import User from "./model"

export const getProfile = async () => {
  const userProfile = await User.findOne().select(
    "-password"
  )
  if (!userProfile) {
    return { error: "El usuario no existe" }
  }
  const userGames = await Game.find({
    author: userProfile._id 
  })
  const profileWithGames = {
    ...userProfile.toObject(),
    games: userGames,
  }
  return { data: profileWithGames }
}
