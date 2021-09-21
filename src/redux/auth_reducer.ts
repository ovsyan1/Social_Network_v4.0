import { BaseThunkType, InferActionsTypes } from './redux-store';
import { securityAPI } from './../api/security_api';
import { authAPI } from './../api/auth_api';
import { ResultCodesForCaptchaEnum } from './../api/api';
import { ResultCodesEnum } from '../api/api';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    errors: null as null | boolean
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
        switch(action.type){
            case 'samurai-network/auth/SET_USER_DATA':
            case 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS':
                return {
                    ...state,
                    ...action.payload,
                }
            // case 'samurai-network/auth/SET_ERROR':
            //     return {...action, ...action.data}       
            default:
                return state;
        }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'samurai-network/auth/SET_USER_DATA', payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
    } as const),
    setErrorsData: (errors: boolean) => ({type: 'samurai-network/auth/SET_ERROR', data: {errors}
    } as const)
}


export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.me()
        if(meData.resultCode === ResultCodesEnum.Success) { // User authorized
            let {id, email, login} = meData.data;
            dispatch(actions.setAuthUserData(id, email, login, true))
        }
}

// export const setErrors = (errors: boolean) => (dispatch: any) => {
//     // dispatch({type: 'samurai-network/auth/SET_ERROR', data: {errors}});
//     dispatch(actions.setErrorsData(errors));
// }

export const login = (email: string, password: string, rememberMe: boolean, captcha:  null | undefined): ThunkType => async (dispatch) => {
    const data = await authAPI.login(email, password, rememberMe, captcha);
            if(data.resultCode === ResultCodesEnum.Success){
                dispatch(getAuthUserData());
                // dispatch(setErrors(false));
            }else{
                if(data.resultCode === ResultCodesForCaptchaEnum.CaptchaIsRequired){
                    dispatch(getCaptchaUrl());
                }
                // dispatch(setErrors(true));
            }        
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    let captcha = data.url
    dispatch(actions.getCaptchaUrlSuccess(captcha));   
}

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout();
            if(response.data.resultCode === 0){
                dispatch(actions.setAuthUserData(null, null, null, false));
            }
}

export default authReducer;

export type InitialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>