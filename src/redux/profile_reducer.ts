import {PostType, ContactsType, PhotosType, ProfileType} from '../types/types'
import {profileAPI, usersAPI} from '../api/api';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let count = 6;




let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 23},
        { id: 2, message: "It's my first post", likesCount: 56},
        { id: 3, message: 'yo'},
        { id: 4, message: 'yo'},
        { id: 5, message: 'yo'},
        { id: 6, message: 'yo'}
      ] as Array<PostType>,
      newPostText: 'it-kamasutra.com',
      profile: null as ProfileType | null,
      status: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
        switch(action.type){
            case ADD_POST: {
                let newPost = {
                id: ++count,
                message: state.newPostText,
                likesCount: 0
                }
                return {
                    ...state, 
                    posts: [...state.posts, newPost],
                    newPostText: ''
                };
            }    
            case UPDATE_NEW_POST_TEXT:
                return {...state, newPostText: action.newText}
            case SET_USER_PROFILE: 
                return {...state, profile: action.profile}
            case SET_STATUS:
                return {...state, status: action.status}
            case DELETE_POST:
                return {...state, posts: state.posts.filter(p => p.id != action.postId)}
            case SAVE_PHOTO_SUCCESS:
                return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
            default:
                return state;
        }
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({type: ADD_POST, newPostText})

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status});

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId});

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});

type updateNewPostTextActionType = {
    type: typeof UPDATE_NEW_POST_TEXT
    newText: string
}
export const updateNewPostTextActionCreator = (text: string): updateNewPostTextActionType => 
    ({type: UPDATE_NEW_POST_TEXT, newText: text});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
        let data = await usersAPI.getProfile(userId);
        dispatch(setUserProfile(data));
} 

export const getStatus = (userId: number) => async (dispatch: any) => {
        let response = await profileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    try{
       let response = await profileAPI.getStatus(status);
            if(response.data.resultCode === 0){
                dispatch(setStatus(status));
            }  
    } catch(error){
        console.error(error) // or dispatch error
    }
  
}
export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);
              if(response.data.resultCode === 0){
                  dispatch(savePhotoSuccess(response.data.data.photos));
              } 
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any) => {
    let response = await profileAPI.saveProfile(profile);
              if(response.data.resultCode === 0){
                  dispatch(savePhotoSuccess(response.data.data.photos));
              } 
}


export default profileReducer;