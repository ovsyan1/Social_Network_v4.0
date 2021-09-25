import React from 'react';
import { connect } from 'react-redux';
import {actions, ThunkType} from '../../../redux/profile_reducer';
import { AppStateType } from '../../../redux/redux-store';
import MyPosts from './MyPosts';


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            dispatch(actions.updateNewPostTextActionCreator(text))
        },
        addPost: (newPostText) => {
            dispatch(actions.addPostActionCreator(newPostText));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;