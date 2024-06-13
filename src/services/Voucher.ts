
import { Voucher } from '@/models/Voucher'
import axios from 'axios'
const API_URL = 'https://flightbookingbe-production.up.railway.app/'

export const getVoucherByCode = async (code: string) : Promise<Voucher | null> => {
    try {
        const response = await axios.get<Voucher>(`${API_URL}voucher/get-by-code?code=${code}`)
        if (response.status === 200) {
            return response.data
        }
        return null
    } catch (error) {
        console.error(error)
        return null
    }
}