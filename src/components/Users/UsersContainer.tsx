import React from 'react';
import {connect} from 'react-redux';
import { follow, unfollow, requestUsers } from '../../redux/users_reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getUsers , getPageSize, 
        getTotalItemsCount, getCurrentPage, 
        getIsFetching, getFollowingInProgress } from '../../redux/users_selectors';
import {UserType} from '../../types/types';
import {AppStateType} from '../../redux/redux-store';

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean | undefined
    totalItemsCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    requestUsers:(currentPage: number, pageSize: number) => void
}
type OwnPropsType = {
   pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
        
class UsersContainer extends React.Component<PropsType> {
    componentDidMount(){
        let {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }
    onPageChanged = (pageNumber: number) => {
        let {pageSize} = this.props;
        this.props.requestUsers(pageNumber, pageSize);
    }
    render(){
        return (
        <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
            <Users totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage} 
                onPageChanged={this.onPageChanged}
                users={this.props.users} 
                follow={this.props.follow} 
                unfollow={this.props.unfollow}
                // isFetching={this.props.isFetching} 
                followingProgress={this.props.followingInProgress}
            />
        </>)
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalItemsCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps, 
        {follow, unfollow, requestUsers})
)(UsersContainer)
