import UserModel from '../models/user'

module.exports = {
    // signup
    signup: async (userDTO) => {
        const userDoc = new UserModel({ ...userDTO, nextRank: "5e382d0e82d5ff0718d6339d"})
        return await userDoc.save()
        
    },

    // login
    login: async (userDTO) => {
        return await UserModel.findOne(userDTO);
    },
    
    // check isDuplicated
    isDuplicated: async (type, data) => {
        if (type === "email") {
            const userDoc = await UserModel.findOne({ email: data })
        }
        if (type === "nickName") {
            const userDoc = await UserModel.findOne({ nickName: data })
        }
        return !!userDoc
    }
}