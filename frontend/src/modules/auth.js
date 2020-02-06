// Action type
const LOGIN = "auth/LOGIN";   // module name / action name
const LOGOUT = "auth/LOGOUT";

// ACtion creator
export const login = (user) => ({
    type: LOGIN,
    user
});

export const logout = () => ({type: LOGOUT});

const initialState = {
    user: {}
}

// reducer
function auth(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.user
            }
        case LOGOUT:
            return {
                ...state,
                user: {}
            }
        default:
            return state
    }
}

export default auth;