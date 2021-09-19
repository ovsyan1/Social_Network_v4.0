import React from 'react';
import User from './User';
import {UserType} from '../../types/types';
import Paginator from '../common/Paginator/Paginator';

type UsersType = {
    totalItemsCount: number
    pageSize: number 
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
    users: Array<UserType>
    followingProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: React.FC<UsersType> = ({
    currentPage, 
    onPageChanged, 
    totalItemsCount, 
    pageSize, 
    users, 
    followingProgress, 
    follow, 
    unfollow 
    }) => {
    return(
        <div>
                <Paginator 
                    currentPage={currentPage} 
                    onPageChanged={onPageChanged} 
                    totalItemsCount={totalItemsCount} 
                    pageSize={pageSize}
                />
                {users.map(u => {
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