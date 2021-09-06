import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = React.memo((props) => {

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps !== this.props || nextState !== this.state;
    // }

        console.log('render');
       let postsElements = props.posts.map(post => {
            return <Post message={post.message} count={post.likesCount} key={post.likesCount}/>
    });

    let newPostElement = React.createRef();

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
                        <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} cols="20" rows="4"/>
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