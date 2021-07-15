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
// interface CreateAutosDto {
//     model: string,

//     year: number,
// }

// export const createAutos = async (body ): Promise<any> => {
//     const body = {
//         model: name,
//         year: 1976,
//         price: 300000,
//         brandId: 2
//     }

//     return api.post("/autos", body).then((res) => {
//         console.log(res)
//         return res
//     })
// }

export const deleteAuto = async (id: number): Promise<number> => {
    return api.delete(`/autos/${id}`).then(({ status }) => {
        return status
    })
}