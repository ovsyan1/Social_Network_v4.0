import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {PostType} from '../../../types/types';



type PropsType = {
    posts: Array<PostType>
    addPost: () => void
    updateNewPostText: (text: string) => void
    newPostText: string
}

const MyPosts: React.FC<PropsType> = React.memo((props) => {

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps !== this.props || nextState !== this.state;
    // }

       let postsElements = props.posts.map(post => {
            return <Post message={post.message} count={post.likesCount} key={post.likesCount}/>
    });

    let newPostElement: any = React.createRef();

    let onAddPost = () => {
        props.addPost();
    }
    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text)
    }
    return <div className={classes.postsBlock}>
                <h3>My posts</h3>
                <div className={classes.post}>
                    <div>
                        <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                    </div>
                    <div>
                       <button onClick={onAddPost}>Add post</button> 
                    </div>
                </div>
                    <div className={classes.posts}>
                        New post
                        {postsElements}
                    </div>
            </div> 
})

export default MyPosts;