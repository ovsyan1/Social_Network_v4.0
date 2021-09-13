import React from 'react';
import { withFormik } from 'formik';
// import {compose} from "redux";
// import {connect} from "react-redux";

class ProfileDataForm extends React.Component{
        render(){
        const { 
            profile, 
            goToEditMode, 
            values, 
            touched, 
            errors,
            handleChange, 
            handleBlur, 
            handleSubmit
        } = this.props;

        return (
        <form onSubmit={handleSubmit}>
            <div><button type='submit'>save</button></div>
            <div>
                <div>
                    <label htmlFor="name"><b>Name:</b></label>
                    <div>
                    <input 
                        placeholder={'type your Name'}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        name='name'
                        />
                        </div>
                </div>
                <div>
                    <label htmlFor="lookingForAJob"><b>Looking for a job:</b></label>
                    <input 
                        type="checkbox"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lookingForAJob}
                        name='lookingForAJob'
                        />
                </div>
                <div><b>Looking for a job: </b>{profile.lookingForAJobDescription ? 'yes' : 'no'}</div>
                <div><b>Status:</b> {profile.aboutMe}</div>
            </div>
        </form>
    )
        }
    
}

const ProfileDataFormContainer = withFormik({
    mapPropsToValues: () => ({name: ''}),
    validate: values => {
        const errors = {};

        if(!values.name){
            errors.name = 'Required';
        }
        return errors;
    },
    handleSubmit: (values, { props, setSubmitting, saveProfile }) => {        
        console.log(JSON.stringify(values, null, 2));
        saveProfile(JSON.stringify(values, null, 2));
        setSubmitting(false);
    },
    displayName: 'BasicForm1'
})(ProfileDataForm);

export default ProfileDataFormContainer;