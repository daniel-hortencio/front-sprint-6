import { BrandTypes } from '../../types/brand'
import { api } from '../api'

interface CreateBrandDTO {
    name: string;
}

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

export const getBrand = async (id: number): Promise<BrandTypes> => {
    return api.get(`/brands/${id}`).then(({ data }) => {
        console.log(data)
        const auto = {
            id: data.id,
            name: data.name
        } as BrandTypes
        return auto;
    })
}

export const createBrand = async (body: CreateBrandDTO): Promise<any> => {

    return api.post("/brands", body).then((res) => {
        return res
    })
}

export const editBrand = async (id: number, body: CreateBrandDTO): Promise<any> => {

    return api.put(`/brands/${id}`, body).then((res) => {
        return res
    })
}

export const deleteBrand = async (id: number): Promise<number> => {
    return api.delete(`/brands/${id}`).then(({ status }) => {
        return status
    })
}