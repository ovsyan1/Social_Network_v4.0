import { AppStateType } from './redux-store';
import {UserType} from '../types/types';
import {usersAPI} from '../api/api';
import {updateObjectInArray} from './object-helpers';
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users ids
}

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    
        switch(action.type){
            case FOLLOW: 
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
            case UNFOLLOW:
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
            case SET_USERS:
                return {...state, users: action.users}

            case SET_CURRENT_PAGE:
                return {...state, currentPage: action.currentPage }
            case SET_USERS_TOTAL_COUNT:
                return {...state, totalUsersCount: action.count }
            case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
            case TOGGLE_IS_FOLLOWING_PROGRESS:
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

type ActionsType = FollowSuccessActionType | 
    UnfollowSuccessActionType | 
    SetUsersActionType | 
    SetCurrentPageActionType | 
    SetUsersTotalCountActionType | 
    ToggleIsFetchingActionType | 
    ToggleFollowingProgressActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId});
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId : number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId});
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users});
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage});
type SetUsersTotalCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT
    count: number
}
export const setUsersTotalCount = (count: number): SetUsersTotalCountActionType => ({type: SET_USERS_TOTAL_COUNT, count});
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type:TOGGLE_IS_FETCHING, isFetching })
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({type:TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })


type GetStateType = () => AppStateType 
type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
      return async (dispatch, getState) => {
              console.log(getState())
            dispatch(toggleIsFetching(true));
            dispatch(setCurrentPage(page));
            let data =  await usersAPI.requestUsers(page, pageSize);
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setUsersTotalCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);

    if(response.data.resultCode === 0){
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
            let apiMethod = usersAPI.follow.bind(usersAPI);
            _followUnfollowFlow(dispatch, userId, apiMethod, followSuccess);
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
                let apiMethod = usersAPI.unfollow.bind(usersAPI);
                _followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess)
}

export default usersReducer;