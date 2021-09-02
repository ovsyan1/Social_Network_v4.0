import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
    if(!props.profile){
        return <Preloader />
    }
    console.log(props.profile)
    return (
            <div>
                <div className={classes.discriptionBlock}>
                    <img src={props.profile.photos.large}></img>
                    <div><b>Name:</b> {props.profile.fullName}</div>
                    <div><b>Status:</b> {props.profile.aboutMe}</div>
                    <div><b>Insta account:</b> {props.profile.contacts.instagram}</div>
                    <div><b>Looking for a job: </b>{props.profile.lookingForAJobDescription}</div>
                    <ProfileStatus status={props.profile.fullName} updateStatus={props.updateStatus}/>
                </div>
            </div>
    )
}

export default ProfileInfo;