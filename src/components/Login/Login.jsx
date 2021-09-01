import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as yup from 'yup';

const LoginForm = (props) => {
    // const validationsSchema = yup.object().shape({
    //     login: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    //     password: yup.string().typeError('Должно быть строкой').required('Обязательно')
    // })


    return (
        <Formik 
            initialValues = {{ login: '', password: ''}}
            validateOnBlur // Когда будет валидироваться - при переходе на след инпут 
            onSubmit = {(values) => console.log(values)}
            // validationsSchema={validationsSchema}
            validate = { values => {
                const errors = {};
                if(!values.login) {
                    errors.login = 'Required';
                }
                return errors;
            }}  
            
        >
            {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => ( 
                <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor={"login"}>Login</label><br/>
                    <input 
                        type="text" 
                        name={'login'} 
                        placeholder={'login'} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.login}
                        />
                        {errors.login && touched.login && errors.login}
                </p>
                <div>
                <label htmlFor={"password"}>Password</label><br/>
                    <input 
                        type="password" 
                        name={'password'} 
                        placeholder={'Password'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        />
                        {errors.login && touched.login && errors.login}
                </div>
                <div>
                    <input 
                        type={"checkbox"}
                        name={'checkbox'} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.checkbox}
                        />
                        Remember me
                </div>
                <div>
                    <button 
                        disabled={!isValid && !dirty} 
                        onClick={handleBlur}
                        
                        type={'submit'}
                    >Login
                    </button>
                </div>
            </form>
            )}
            
        </Formik>
    )
}


const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
        </div>
    )
}



export default Login