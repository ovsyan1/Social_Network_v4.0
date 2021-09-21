import { AppStateType, InferActionsTypes } from './redux-store';
import {UserType} from '../types/types';
import {usersAPI} from '../api/users_api';
import {updateObjectInArray} from './object-helpers';
import { Dispatch } from 'react';
import {BaseThunkType} from './redux-store';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users ids
}

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    
        switch(action.type){
            case 'FOLLOW': 
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
                // users: state.users.map(user => {
                //     if(user.id === action.userId){
                //         return{...user, followed: true}
                //     }
                //     return user;
                // })
            }
            case 'UNFOLLOW':
                return {
                    ...state,
                    users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
                    // users: state.users.map(user => {
                    //     if(user.id === action.userId){
                    //         return{...user, followed: false}
                    //     }
                    //     return user
                    // })
                }
            case 'SET_USERS':
                return {...state, users: action.users}

            case 'SET_CURRENT_PAGE':
                return {...state, currentPage: action.currentPage }
            case 'SET_USERS_TOTAL_COUNT':
                return {...state, totalUsersCount: action.count }
            case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
            case 'TOGGLE_IS_FOLLOWING_PROGRESS':
                return {
                    ...state, 
                    followingInProgress: action.isFetching 
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id != action.userId)]
                }
            default:
                return state;
        }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId : number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setUsersTotalCount: (count: number) => ({type: 'SET_USERS_TOTAL_COUNT', count} as const),
    toggleIsFetching: (isFetching: boolean) => ({type:'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type:'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
}

export const requestUsers = (page: number, pageSize: number): ThunkType => {
      return async (dispatch, getState) => {
              console.log(getState())
            dispatch(actions.toggleIsFetching(true));
            dispatch(actions.setCurrentPage(page));
            let data =  await usersAPI.requestUsers(page, pageSize);
            dispatch(actions.toggleIsFetching(false));
            dispatch(actions.setUsers(data.items));
            dispatch(actions.setUsersTotalCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if(response.data.resultCode === 0){
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
            let apiMethod = usersAPI.follow.bind(usersAPI);
            _followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess);
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
                let apiMethod = usersAPI.unfollow.bind(usersAPI);
                _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess)
}

export default usersReducer;


// type GetStateType = () => AppStateType 
type InitialStateType = typeof initialState;
type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>