import React, { useEffect } from 'react';
import User from './User';
import Paginator from '../common/Paginator/Paginator';
import UsersSearchForm from './UsersSearchForm';
import { FilterType, requestUsers } from '../../redux/users_reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getPageSize, getTotalItemsCount, getUsersFilter, getUsers, getFollowingInProgress } from '../../redux/users_selectors';
import { useHistory } from 'react-router-dom'; // ? react-router
import queryString from 'querystring'

type PropsType = {}

type QueryParamsType = {term?: string, page?: string, friend?: string}

export const Users: React.FC<PropsType> = React.memo((props) => {

        const users = useSelector(getUsers)
        const totalItemsCount = useSelector(getTotalItemsCount) // same with mapStateToProps
        const currentPage = useSelector(getCurrentPage)
        const pageSize = useSelector(getPageSize)
        const filter = useSelector(getUsersFilter)
        const followingInProgress = useSelector(getFollowingInProgress)

        const dispatch = useDispatch()
        const history = useHistory()

        useEffect(() => {
            const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

            let actualPage = currentPage
            let actualFilter = filter

            if(parsed.page) actualPage = +parsed.page
            if(parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
            if(parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === "null" ? null : parsed.friend === "true" ? true : false}

            dispatch(requestUsers(actualPage, pageSize, actualFilter));
        }, [])

        useEffect(() => {
            const query: QueryParamsType = {}
            if(filter.term) query.term = filter.term
            if(filter.friend !== null) query.friend = String(filter.friend)
            if(currentPage !== 1) query.page = String(currentPage)

            history.push({
                pathname: '/developers',
                // search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
                search: queryString.stringify(query)
            })
        }, [filter, currentPage, history])

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
})
