import React from 'react';
import {connect} from 'react-redux';
import { follow, unfollow, 
        setCurrentPage, toggleFollowingProgress, requestUsers
} from '../../redux/users_reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getUsers , getPageSize, 
        getTotalItemsCount, getCurrentPage, 
        getIsFetching, getFollowingInProgress } from '../../redux/users_selectors';

class UsersContainer extends React.Component{
    componentDidMount(){
        let {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }
    onPageChanged = (pageNumber) => {
        let {pageSize} = this.props;
        this.props.requestUsers(pageNumber, pageSize);
    }
    render(){
        return (
        <>
        {this.props.isFetching ? <Preloader /> : null}
            <Users totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage} 
                onPageChanged={this.onPageChanged}
                users={this.props.users} 
                follow={this.props.follow} 
                unfollow={this.props.unfollow}
                isFetching={this.props.isFetching} 
                followingInProgress={this.props.followingInProgress}
            />
        </>)
    }
}

let mapStateToProps = (state) => {
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
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toggleFollowingProgress, requestUsers})
)(UsersContainer)