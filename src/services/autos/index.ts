import { AutoTypes } from '../../types/autos'
import { api } from '../api'

export const getAutos = async (): Promise<AutoTypes[]> => {
    return api.get("/autos").then(({data}) => {
        console.log(data)
        const autos = data.map((auto: any) => {
            return {
                id: auto.id,
                model: auto.model,
                year: auto.year,
                price: auto.price,
                brandId: auto.brandId
            } as AutoTypes
        })

        return autos;
    })
}