import React from 'react';
import profileReducer, { addPostActionCreator, deletePost } from './profile_reducer';

let state = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 'likes 23'},
        { id: 2, message: "It's my first post", likesCount: 'likes 56'},
        { id: 3, message: 'yo'},
        { id: 4, message: 'yo'},
        { id: 5, message: 'yo'},
        { id: 6, message: 'yo'}
      ]
}


it('length of posts should be incremented', () => {
    let action = addPostActionCreator('it-kamasutra.com');
    
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(7); 
});

it('message of new post should be correct', () => {
    let action = addPostActionCreator('it-kamasutra.com');

    let newState = profileReducer(state, action);

   expect(newState.posts[6].message).toBe('it-kamasutra.com');
});

it('after deleting length of messages should be decrement', () => {
    let action = deletePost(1);

    let newState = profileReducer(state, action);

   expect(newState.posts.length).toBe(5);
});

it('after deleting length should not be decrement if id is incorrect', () => {
    let action = deletePost(1000);

    let newState = profileReducer(state, action);
   expect(newState.posts.length).toBe(6);
});

