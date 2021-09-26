import { withFormik } from 'formik';
import React from 'react';
import {Redirect} from 'react-router-dom';
import {compose} from "redux";
import {connect} from "react-redux";
import {login, setErrors} from "../../redux/auth_reducer";
import classes from './Login.module.css';

class Error extends React.Component {
    render(){
        return <div className={classes.error}>Error: wrong login or email !!!</div>
    }
}

class MyForm extends React.Component {
    render() {
        const {
            values,
            touched, 
            errors,
            handleChange,
            handleBlur,
            handleSubmit
        } = this.props;
        if(this.props.auth.isAuth){
            return <Redirect to={'/profile'} />
        }
        return (
            <div>
                    <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <div>
                        <input 
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            name="email"
                        />
                        </div>
                        {errors.email && touched.email && <div id="feedback">{errors.email}</div>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <div>
                        <input 
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            name="password"
                        />
                        </div>
                            {errors.password && touched.password && <div id="feedback">{errors.password}</div>}
                    </div>
                    <div>
                        <input 
                            type="checkbox"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.rememberMe}
                            name="rememberMe"
                        />
                        <span>rememberMe</span>
                        {this.props.auth.errors && <Error />}
                    </div>
                    <div>
                        {this.props.captchaUrl && <img src={this.props.captchaUrl} alt=""/>}
                        <div>
                        {this.props.captchaUrl && <input 
                            type='text'
                            placeholder='Symbols from image'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name='captcha'
                            />}
                        </div>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        )
    }
};

const LoginContainer = withFormik({
    mapPropsToValues: () => ({email: ''}),
    validate: values => {
        const errors = {};
        if(!values.email){
            errors.email = <div className={classes.error}>{'Required'}</div>;
        }
        return errors;
    },
    handleSubmit: (values, { props, setSubmitting }) => {
        props.login(values.email, values.password, values.rememberMe, values.captcha);
        setSubmitting(false);
    },
    displayName: 'BasicForm'
})(MyForm);

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    auth: state.auth
});

export default compose(
    connect(mapStateToProps, {login}),
)(LoginContainer);