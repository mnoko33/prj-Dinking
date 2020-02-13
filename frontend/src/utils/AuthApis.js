// eslint-disable-next-line
import axios from 'axios'
const baseUrl = 'http://localhost:8080/api'

const regex = (type, data) => {
    if (type === "email") {
        const re = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return re.test(data)
    }
    if (type === "password") {
        const re = /^[a-zA-Z0-9]{8,16}$/;
        return re.test(data)
    }
}

export const axiosLogin = async (email, password) => {
    const res = await axios.post(`${baseUrl}/auth/login`, {email, password});
    const user = res.data.user
    if (user) {
        localStorage.setItem('userInfo', JSON.stringify({
            profile: user.profile,
            rank: user.rank,
            _id: user._id,
            nickName: user.nickName
        }))
        return user
    }
    return false
}

export const emailCheck = async (type, data) => {
    if (data === '') return false
    if (!regex("email", data)) return false
    const res = await axios.get(`${baseUrl}/auth/signup`, { params: { type, data } });
    if (res.data.isDuplicated) {
        return false
    }
    return true
}

export const passwordCheck = async (password1, password2) => {
    if (password1 === '' || !regex("password", password1) || password1 !== password2) return false
    return true
}

export const nickNameCheck = async (type, data) => {
    if (data === '') return false
    const res = await axios.get(`${baseUrl}/auth/signup`, { params: { type, data } });
    if (res.data.isDuplicated) {
        return false
    }
    return true
}

export const axiosSignup = async (state) => {
    if (state.emailValidation && state.passwordValidation && state.nickNameValidation && state.TOS) {
            const res = await axios.post(`${baseUrl}/auth/signup`, {
                email: state.email,
                password: state.password1,
                nickName: state.nickName
            })
            if (res.status) return true
        }
    return false
}