import * as Repository from "./repository"

export const getProfile = async () => {
    const { data, error } = await Repository.getProfile()
    if (error) {
        return { error }
    }
    return { data }
}