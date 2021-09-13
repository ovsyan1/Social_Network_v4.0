import React from 'react';
import User from './User';
import Paginator from '../common/Paginator/Paginator';

const Users = ({
    currentPage, 
    onPageChanged, 
    totalItemsCount, 
    pageSize, 
    users, 
    followingProgress, 
    follow, 
    unfollow }) => {
    return(
        <div>
                <Paginator 
                    currentPage={currentPage} 
                    onPageChanged={onPageChanged} 
                    totalItemsCount={totalItemsCount} 
                    pageSize={pageSize}
                />
                {users.map(u => {
                    console.log(u);
                   return (
                    <User key={u.id} 
                            user={u} 
                            followingProgress={followingProgress}
                            follow={follow}
                            unfollow={unfollow}
                            />
                    )
                })}
        </div>
    )
}

export default Users;