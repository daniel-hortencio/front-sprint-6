import { SummaryTypes } from '../../types/summary'
import { api } from '../api'

export const getSummary = async (): Promise<SummaryTypes[]> => {
    return api.get("/summary").then(({ data }) => {
        console.log("summary", data);
        const summary = data.map((sum: any) => {
            return {
                id: sum.id,
                name: sum.name,
                autos: sum.autos,
                totalPrice: sum.totalPrice
            } as SummaryTypes
        })

        return summary;
    })
}