import { BrandTypes } from '../../types/brand'
import { api } from '../api'

export const getBrands = async (): Promise<BrandTypes[]> => {
    return api.get("/brands").then(({ data }) => {
        const brands = data.map((brand: any) => {
            return {
                id: brand.id,
                name: brand.name
            } as BrandTypes
        })

        return brands;
    })
}

export const deleteBrand = async (id: number): Promise<number> => {
    return api.delete(`/brands/${id}`).then(({ status }) => {
        return status
    })
}