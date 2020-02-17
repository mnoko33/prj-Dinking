import axios from 'axios'
const baseUrl = 'http://localhost:8080/api'

export const getRanking = async (idx, limit) => {
    const res = await axios.get(`${baseUrl}/users/rank/${idx}/${limit}`);
    console.log(res)
    return res.data.userList
}