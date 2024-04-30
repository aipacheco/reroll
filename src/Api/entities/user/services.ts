import * as Repository from "./repository"

export const getProfile = async (username:string) => {
    const { data, error } = await Repository.getProfile(username)
    if (error) {
        return { error }
    }
    return { data }
}