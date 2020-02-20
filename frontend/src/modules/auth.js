// Action type
const LOGIN = "auth/LOGIN";   // module name / action name
const LOGOUT = "auth/LOGOUT";

// ACtion creator
export const login = (user) => ({ type: LOGIN, user });

export const logout = () => ({type: LOGOUT});

const initialState = {
    user: null
}

// reducer
function auth(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: {
                    profile: action.user.profile,
                    rank: action.user.rank,
                    _id: action.user._id,
                    nickName: action.user.nickName
                }
            }
        case LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}

export default auth;