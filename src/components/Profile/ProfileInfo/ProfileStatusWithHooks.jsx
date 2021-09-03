import React, { useState } from 'react';

const ProfileStatusWithHooks =  (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateMode = () => {
        setEditMode(true);
    }
    const deactivateMode = () => {
        setEditMode(false);
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
        props.updateStatus(status);
    }


        return (
        <div>
            { !editMode &&
            <div>
                <span onDoubleClick={activateMode}>{ props.status || '---------'}</span>
            </div>
            }
            { editMode &&
            <div>
                <input autoFocus={true}
                onBlur={deactivateMode}
                onChange={onStatusChange}
                value={status}
                />
            </div>
            }
        </div>
    )    
}

export default ProfileStatusWithHooks;