import {profileAPI, usersAPI} from '../api/api';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let count = 6;

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 'likes 23'},
        { id: 2, message: "It's my first post", likesCount: 'likes 56'},
        { id: 3, message: 'yo'},
        { id: 4, message: 'yo'},
        { id: 5, message: 'yo'},
        { id: 6, message: 'yo'}
      ],
      newPostText: 'it-kamasutra.com',
      profile: null,
      status: ''
}

const profileReducer = (state = initialState, action) => {
        switch(action.type){
            case ADD_POST: {
                let newPost = {
                id: ++count,
                message: state.newPostText,
                likesCount: 0
                };
                let stateCopy = {...state}
                stateCopy.posts = [...state.posts];
                stateCopy.posts.push(newPost);
                stateCopy.newPostText = '';
                return stateCopy;
            }    
            case UPDATE_NEW_POST_TEXT:
                let stateCopy = {...state};
                stateCopy.newPostText = action.newText;
                return stateCopy;
            case SET_USER_PROFILE: 
                return {...state, profile: action.profile}
            case SET_STATUS:
                return {...state, status: action.status}
            default:
                return state;
        }
}

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});

export const getUserProfile = (userId) => (dispatch) => {
        usersAPI.getProfile(userId).then(data => {
            dispatch(setUserProfile(data));
    })
} 

export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data));
        })
}
export const updateStatus = (status) => (dispatch) => {
    profileAPI.getStatus(status)
        .then(response => {
            if(response.data.resultCode === 0){
                dispatch(setStatus(status));
            } 
        })
}

export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
}

export default profileReducer;