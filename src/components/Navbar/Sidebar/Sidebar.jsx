import React from 'react';
import classes from '../Navbar.module.css';

const Sidebar = (props) => {
    return (
        <div>
        <div className={classes.box_circle}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className={classes.box_under_circle_names}>
                 <span>Vasya</span><span>Sasha</span><span>Sveta</span>
        </div>
        </div>
    )
}
export default Sidebar;