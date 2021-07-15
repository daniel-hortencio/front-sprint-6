import { AutoTypes } from '../../types/autos'
import { api } from '../api'


interface CreateAutosDTO {
    model: string,
    year: number,
    price: number
    brandId: number,
}

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

export const getAuto = async (id: number): Promise<AutoTypes> => {
    return api.get(`/autos/${id}`).then(({ data }) => {
        console.log(data)
        const auto = {
            id: data.id,
            model: data.model,
            year: data.year,
            price: data.price,
            brand: data.brand
        } as AutoTypes
        return auto;
    })
}

export const createAutos = async (body: CreateAutosDTO): Promise<any> => {

    return api.post("/autos", body).then((res) => {
        return res
    })
}

export const editAutos = async (id: number, body: CreateAutosDTO): Promise<any> => {

    return api.put(`/autos/${id}`, body).then((res) => {
        return res
    })
}

export const deleteAuto = async (id: number): Promise<number> => {
    return api.delete(`/autos/${id}`).then(({ status }) => {
        console.log(status)
        return status
    })
}