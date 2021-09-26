import React, { useEffect } from 'react';
import User from './User';
import Paginator from '../common/Paginator/Paginator';
import UsersSearchForm from './UsersSearchForm';
import { FilterType, requestUsers } from '../../redux/users_reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getPageSize, getTotalItemsCount, getUsersFilter, getUsers, getFollowingInProgress } from '../../redux/users_selectors';

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {

        const users = useSelector(getUsers)
        const totalItemsCount = useSelector(getTotalItemsCount) // same with mapStateToProps
        const currentPage = useSelector(getCurrentPage)
        const pageSize = useSelector(getPageSize)
        const filter = useSelector(getUsersFilter)
        const followingInProgress = useSelector(getFollowingInProgress)

        const dispatch = useDispatch()

        useEffect(() => {
            dispatch(requestUsers(currentPage, pageSize, filter));
        }, [])

        const onPageChanged = (pageNumber: number) => {
            dispatch(requestUsers(pageNumber, pageSize, filter))
        }
        const onFilterChanged = (filter: FilterType) => {
            dispatch(requestUsers(1, pageSize, filter))
        }
        const follow = (userId: number) => {
            dispatch(follow(userId))
        }
        const unfollow = (userId: number) => {
            dispatch(unfollow(userId))
        }
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
                            followingInProgress={followingInProgress}
                            follow={follow}
                            unfollow={unfollow}
                            />
                    )
                })}
        </div>
    )
}
