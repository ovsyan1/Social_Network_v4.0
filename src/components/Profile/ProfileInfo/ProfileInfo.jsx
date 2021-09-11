import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, updateStatus}) => {
    if(!profile){
        return <Preloader />
    }
    return (
            <div>
                <div className={classes.discriptionBlock}>
                    <img src={profile.photos.large}></img>
                    <div><b>Name:</b> {profile.fullName}</div>
                    <div><b>Status:</b> {profile.aboutMe}</div>
                    <div><b>Insta account:</b> {profile.contacts.instagram}</div>
                    <div><b>Looking for a job: </b>{profile.lookingForAJobDescription}</div>
                    <ProfileStatusWithHooks status={profile.fullName} updateStatus={updateStatus}/>
                </div>
            </div>
    )
}

export default ProfileInfo;