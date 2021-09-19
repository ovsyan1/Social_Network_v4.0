import { getAuthUserData } from './auth_reducer';

const SET_INITIALIZED_SUCCESS = 'SET_INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
    // globalError: null
}

let initialState: InitialStateType = {
    initialized: false,
    // globalError: null
}


const appReducer = (state = initialState, action: any): InitialStateType => {
        switch(action.type){
            case SET_INITIALIZED_SUCCESS:
                return {
                    ...state,
                    initialized: true
                }         
            default:
                return state;
        }
}

type initializedSuccessActionType = {
    type: typeof SET_INITIALIZED_SUCCESS  // 'SET_INITIALIZED_SUCCESS'
}

export const initializedSuccess = (): initializedSuccessActionType => ({
    type: SET_INITIALIZED_SUCCESS
});

export const initializeApp = () => (dispatch: any) => {
       let promise =  dispatch(getAuthUserData());
       Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess());  
            })
        
}

export default appReducer;