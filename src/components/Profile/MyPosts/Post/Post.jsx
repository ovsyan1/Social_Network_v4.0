import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
    return <div className={classes.item}>
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="avatar-person"/>
                <div>
                    <span>{props.message}</span>
                </div>
                <div>
                    <span>{props.count}</span>
                </div>
            </div>
}

export default Post;