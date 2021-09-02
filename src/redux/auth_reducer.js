import {authAPI} from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_ERROR = 'SET_ERROR';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
        switch(action.type){
            case SET_USER_DATA:
                return {
                    ...state,
                    ...action.payload
                }
            case SET_ERROR:
                return {...action, ...action.data}            
            default:
                return state;
        }
}


export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, 
        payload: {userId, email, login, isAuth}});

export const getAuthUserData = () => (dispatch) => {
    authAPI.me().then(response => {
        if(response.data.resultCode === 0) { // User authorized
            let {id, email, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true))
        }
})
}

export const setErrors = (errors) => (dispatch) => {
    dispatch({type: SET_ERROR, data: {errors}});
}

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe, true)
        .then(response => {
            if(response.data.resultCode === 0){
                dispatch(getAuthUserData());
                dispatch(setErrors(false));
            }else{
                dispatch(setErrors(true));
            }
        })
        
}

export const logout = (email, password, rememberMe) => (dispatch) => {
    authAPI.logout(email, password, rememberMe)
        .then(response => {
            if(response.data.resultCode === 0){
                dispatch(setAuthUserData(null, null, null, false));
            }
        })
}





export default authReducer;