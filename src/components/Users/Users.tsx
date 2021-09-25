import React from 'react';
import User from './User';
import {UserType} from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import UsersSearchForm from './UsersSearchForm';
import { FilterType } from '../../redux/users_reducer';


type UsersType = {
    totalItemsCount: number
    pageSize: number 
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
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
    unfollow,
    onFilterChanged
    }) => {
    return(
        <div>
            <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/> 
            </div>
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