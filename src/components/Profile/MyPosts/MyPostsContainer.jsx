import React from 'react';
import { connect } from 'react-redux';
import {actions} from '../../../redux/profile_reducer';
import MyPosts from './MyPosts';


let mapStateToProps = state => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = dispatch => {
    return {
        updateNewPostText: (text) => {
            let action = actions.updateNewPostTextActionCreator(text);
            dispatch(action)
        },
        addPost: () => {
            dispatch(actions.addPostActionCreator());
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;