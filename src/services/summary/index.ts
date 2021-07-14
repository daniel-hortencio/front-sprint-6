import { AutoTypes } from '../../types/autos'
import { api } from '../api'

export const getAutos = async (): Promise<AutoTypes[]> => {
    return api.get("/summary").then(({ data }) => {
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

export const deleteAuto = async (id: number): Promise<number> => {
    return api.delete(`/autos/${id}`).then(({ status }) => {
        return status
    })
}