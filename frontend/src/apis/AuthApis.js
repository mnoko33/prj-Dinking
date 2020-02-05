import axios from 'axios'

const baseUrl = 'http://localhost:8080/api'

export const login = async (data) => {
    try {
        const res = await axios.post(`${baseUrl}/auth/login`, data);
        if (res.data.status) {
            alert(`hello ${res.data.data.nickName}`)
        } else {
            alert(res.data.err)
        }
    }
    catch (err) {
        console.log(err)
    }
}