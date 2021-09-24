import React from 'react';
import classes from './Users.module.css';
import userPhoto from '../../assets/images/gordon.jpg';
import  {NavLink} from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType = {
    user: UserType
    followingProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, followingProgress, unfollow, follow }) => {
    return(
        <div>
            <div>
                    <NavLink to={'/profile/' + user.id}>
                    <img className={classes.img} 
                        src={ user.photos.small !== null ? user.photos.small : userPhoto } 
                        alt={user.name}
                    />
                    </NavLink>
            </div>
            <div>
                    {user.followed 
                    ? <button disabled={followingProgress} className={classes.btn} 
                    onClick={() => {unfollow(user.id)}}>unFollow</button>
                    : <button disabled={followingProgress} className={classes.btn} 
                    onClick={() => {follow(user.id);}}>Follow</button>} 
            </div>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status ? user.status : 'I do not have status'}</div>
                        </span>
                            <span>
                                <div>{'user.location.country'}</div>
                                <div>{user.id}</div>
                            </span>
                     </span>
            </div>
    )
}

export default User;