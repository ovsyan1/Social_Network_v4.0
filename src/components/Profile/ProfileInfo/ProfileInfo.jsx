import React, {useState} from 'react';
import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/gordon.jpg';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({profile, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if(!profile){
        return <Preloader />
    }
    const onMainPhotoSelected = (e) => {
        if(e.target.files.length){
            savePhoto(e.target.files[0])
        }
    }


    return (
            <div>
                <div className={classes.discriptionBlock}>
                    <img src={profile.photos.large || userPhoto}></img>
                    {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                    {editMode 
                    ? <ProfileDataForm profile={profile} saveProfile={saveProfile}/> 
                    : <ProfileData 
                        profile={profile} 
                        isOwner={isOwner}
                        goToEditMode={() => setEditMode(true)}/>}
                    <ProfileStatusWithHooks status={profile.fullName} updateStatus={updateStatus}/>
                </div>
            </div>
    )
}

const ProfileData = ({profile, isOwner,goToEditMode}) => {
    return (
        <div>
            {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
            <div>
                <div><b>Name:</b> {profile.fullName}</div>
                <div><b>Looking for a job: </b>{profile.lookingForAJobDescription ? 'yes' : 'no'}</div>
                <div><b>Status:</b> {profile.aboutMe}</div>
            </div>
        </div>
    )
}



export default ProfileInfo;