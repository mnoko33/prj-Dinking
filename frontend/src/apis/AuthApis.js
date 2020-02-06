// eslint-disable-next-line
import axios from 'axios'
// eslint-disable-next-line
const baseUrl = 'http://localhost:8080/api'

export const axiosLogin = async (data) => {
    // return true
    try {
        const res = await axios.post(`${baseUrl}/auth/login`, data);
        if (res.data.status) {
            return res.data.data;
        }
        return
    }
    catch (err) {
        console.log(err)
    }
}