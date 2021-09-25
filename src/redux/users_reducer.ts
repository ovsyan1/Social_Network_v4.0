import { InferActionsTypes } from './redux-store';
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
    followingInProgress: [] as Array<number>, // array of users ids
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    
        switch(action.type){
            case 'SN/USERS/FOLLOW': 
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
            case 'SN/USERS/UNFOLLOW':
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
            case 'SN/USERS/SET_USERS':
                return {...state, users: action.users}

            case 'SN/USERS/SET_CURRENT_PAGE':
                return {...state, currentPage: action.currentPage }
            case 'SN/USERS/SET_USERS_TOTAL_COUNT':
                return {...state, totalUsersCount: action.count }
            case 'SN/USERS/TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
            case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
                return {
                    ...state, 
                    followingInProgress: action.isFetching 
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id !== action.userId)]
                }
            case 'SN/USERS/SET_FILTER':
                return {...state, filter: action.payload}
            default:
                return state;
        }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({type: 'SN/USERS/FOLLOW', userId} as const),
    unfollowSuccess: (userId : number) => ({type: 'SN/USERS/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SN/USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
    setUsersTotalCount: (count: number) => ({type: 'SN/USERS/SET_USERS_TOTAL_COUNT', count} as const),
    toggleIsFetching: (isFetching: boolean) => ({type:'SN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type:'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const),
    setFilter: (filter: FilterType) => ({type:'SN/USERS/SET_FILTER', payload: filter} as const)
}

export const requestUsers = (page: number, pageSize: number,
        filter: FilterType): ThunkType => {
      return async (dispatch, getState) => {
            dispatch(actions.toggleIsFetching(true));
            dispatch(actions.setCurrentPage(page));
            dispatch(actions.setFilter(filter));

            let data =  await usersAPI.requestUsers(page, pageSize, filter.term, filter.friend);
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
export type FilterType = typeof initialState.filter
type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>