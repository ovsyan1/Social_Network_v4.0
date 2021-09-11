import React from 'react';
import classes from './Paginator.module.css';

const Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for(let i  = 1;i <= pagesCount;i++){
        pages.push(i);
    }
    return (
        <div className={classes.box_pagination}>
                    <span>&#60;</span>
                    {pages.map(page => {
            if(page <= 15){
                return <span 
                    key={page} 
                    className={currentPage === page ? classes.selectedPage : null} 
                    onClick={(e) => onPageChanged(page)}
                    >
                        {page}
                    </span> 
            }
                       
            })}
            <span>&#62;</span>
        </div>
    )
}

export default Paginator;