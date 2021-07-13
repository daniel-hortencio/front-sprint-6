import { AutoTypes } from '../../types/autos'
import { api } from '../api'

export const getAutos = async (): Promise<AutoTypes[]> => {
    return api.get("/autos").then((data) => {
        console.log(data)

        return [];
    })
}