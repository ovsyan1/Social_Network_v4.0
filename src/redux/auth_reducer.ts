import {authAPI, securityAPI} from '../api/api';

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const SET_ERROR = 'samurai-network/auth/SET_ERROR';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';


// export type initialStateType2 ={
//     userId: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean,
//     captchaUrl: string | null
// }

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
        switch(action.type){
            case SET_USER_DATA:
            case GET_CAPTCHA_URL_SUCCESS:
                return {
                    ...state,
                    ...action.payload,
                }
            case SET_ERROR:
                return {...action, ...action.data}       
            default:
                return state;
        }
}

type setAuthUserDataPayloadType = {
    userId: number | null
    email:  string | null
    login: string | null
    isAuth: boolean
}

type setAuthUserDataActionType = {
        type: typeof SET_USER_DATA, 
        payload: setAuthUserDataPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({
        type: SET_USER_DATA, 
        payload: {userId, email, login, isAuth}
});


type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
});

export const getAuthUserData = () => async (dispatch: any) => {
    const response = await authAPI.me();
        if(response.data.resultCode === 0) { // User authorized
            let {id, email, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true))
        }
}

export const setErrors = (errors: any) => (dispatch: any) => {
    dispatch({type: SET_ERROR, data: {errors}});
}

export const login = (email: string, password: string, rememberMe: boolean, captcha:  null | undefined) => async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);
            if(response.data.resultCode === 0){
                dispatch(getAuthUserData());
                dispatch(setErrors(false));
            }else{
                if(response.data.resultCode === 10){
                    dispatch(getCaptchaUrl());
                }
                dispatch(setErrors(true));
            }        
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));   
}

export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout();
            if(response.data.resultCode === 0){
                dispatch(setAuthUserData(null, null, null, false));
            }
}

export default authReducer;