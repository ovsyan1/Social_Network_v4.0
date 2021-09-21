import React from 'react';
import profileReducer, { actions } from './profile_reducer';

let state = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 23},
        { id: 2, message: "It's my first post", likesCount: 56},
        { id: 3, message: 'yo', likesCount: 56},
        { id: 4, message: 'yo', likesCount: 56},
        { id: 5, message: 'yo', likesCount: 56},
      ],
      newPostText: 'it-kamasutra.com',
      profile: null,
      status: ''
}


it('length of posts should be incremented', () => {
    let action = actions.addPostActionCreator('it-kamasutra.com');
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(6); 
});

it('message of new post should be correct', () => {
    let action = actions.addPostActionCreator('it-kamasutra.com');
    let newState = profileReducer(state, action);

    expect(newState.posts[5].message).toBe('it-kamasutra.com');
});

it('after deleting length of messages should be decrement', () => {
    let action = actions.deletePost(1);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(4);
});

it('after deleting length should not be decrement if id is incorrect', () => {
    let action = actions.deletePost(234);
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(5);
});

