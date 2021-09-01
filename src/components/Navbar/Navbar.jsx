import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
import Sidebar from './Sidebar/Sidebar';

const Navbar = (props) => {
    return  (
            <nav className={classes.nav}>
                <div className={classes.item}>
                    <NavLink to="/profile" activeClassName={classes.active}>Profile</NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/dialogs" activeClassName={classes.active}>Dialogs</NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/users" activeClassName={classes.active}>Users</NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/news" activeClassName={classes.active}>News</NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/music" activeClassName={classes.active}>Music</NavLink>
                </div>
                <div className={classes.item}>
                    <NavLink to="/settings" activeClassName={classes.active}>Settings</NavLink>
                </div>
                <div className={classes.item_friends}>
                    <NavLink to="/friends" activeClassName={classes.active}>Friends</NavLink>
                    <Sidebar />
                </div>
            </nav>
    )
}

export default Navbar;