// eslint-disable-next-line
import axios from 'axios'
// eslint-disable-next-line
const baseUrl = 'http://localhost:8080/api'

export const axiosLogin = async (data) => {
    try {
        const res = await axios.post(`${baseUrl}/auth/login`, data);
        return res.data.user
    }
    catch (err) {
        console.log(err)
    }
}

export const axiosSignup = async (data) => {
    try {
        const res = await axios.post(`${baseUrl}/auth/signup`, data);
        if (res.data.status) {
            return res.data.data
        }
        return
    }
    catch (err) {
        console.log(err)
    }
}

export const checkDuplicate = async (type, data) => {
    try {
        const res = await axios.get(`${baseUrl}/auth/signup`, {
            params: { type, data }
        });
        return res.data.isDuplicated
    } catch (err) {
        console.log(err)
    }
}