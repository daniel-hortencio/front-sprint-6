import { AutoTypes } from '../../types/autos'
import { api } from '../api'

export const getAutos = async (): Promise<AutoTypes[]> => {
    return api.get("/autos").then(({ data }) => {
        console.log(data)
        const autos = data.map((auto: any) => {
            return {
                id: auto.id,
                model: auto.model,
                year: auto.year,
                price: auto.price,
                brand: auto.brand
            } as AutoTypes
        })

        return autos;
    })
}
interface CreateAutosDTO {
    model: string,
    year: number,
    price: number
    brandId: number,
}

export const createAutos = async (body: CreateAutosDTO): Promise<any> => {

    return api.post("/autos", body).then((res) => {
        return res
    })
}

export const deleteAuto = async (id: number): Promise<number> => {
    return api.delete(`/autos/${id}`).then(({ status }) => {
        console.log(status)
        return status
    })
}