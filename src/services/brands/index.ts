import { BrandTypes } from '../../types/brand'
import { api } from '../api'

export const getBrands = async (): Promise<BrandTypes[]> => {
    return api.get("/brands").then((data) => {
        console.log(data)

        return [];
    })
}