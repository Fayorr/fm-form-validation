import React, { useState, useEffect } from 'react'
 import './Form.css'



const Form = () => {

    const [formData, setFormData] = useState({firstname:'', lastname:'', email:'', password:''});
    const [formError, SetFormError] = useState({});

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevData => {
        return ({...prevData, [name]: value})})
        // console.log(e)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        SetFormError(validate(formData))
        setHasSubmitted(true);
    }
    useEffect(() => {
        console.log(formError  )
        if(Object.keys(formError) === 0 && hasSubmitted){
            console.log(formData)
        }
    }, [formError])
    const validate = (values) => {
        const errors = {};
        const regexEmail =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*;[a-zA-Z]).{8,}$/;
        
        if(!values.firstname){
            errors.firstname = 'First Name cannot be empty';
        }
        if(!values.lastname){
            errors.lastname = 'Last Name cannot be empty';
        }
        
        if(!values.email){
            errors.email = 'Email cannot be empty';
        } else if (!regexEmail.test(values.email)){
         errors.email = 'Looks like this is not an email';
        }
        if(!values.password){
            errors.password = 'Password cannot be empty';
        }
        else if (!regexPassword.test(values.password)){
            errors.password = "Password must be at least 8 characters and must have 1 uppercase letter and 1 number"
    }
        return errors;
    }
   return (
        <div className="form-gl-container">
            <button className='btn-1'><span>Try it free 7 days</span>  then $20/mo. thereafter</button>
            <form className='form-container' method='POST' >
                <div className="field-container">
                    <input 
                        type="text"
                        placeholder='First Name'
                        name="firstname"
                        onChange={handleChange}
                        value={formData.firstname}
                    />
                    <p className="error-message">{formError.firstname}</p> 
                </div>
                <div className="field-container">
                    <input 
                        type="text"
                        placeholder='Last Name'
                        name="lastname"
                        onChange={handleChange}
                        value={formData.lastname} 
                    />
                    <p className="error-message">{formError.lastname}</p>
                    </div>
                <div className="field-container">
                    <input 
                        type="email"
                        placeholder='Email Address'
                        name="email"
                        onChange={handleChange}
                        value={formData.email} 
                    />
                    <p className="error-message">{formError.email}</p>
                </div>
                <div className="field-container">
                    <input 
                        type="password"
                        placeholder='Password'
                        name="password"
                        onChange={handleChange}
                        value={formData.password} 
                    />
                    <p className="error-message">{formError.password}</p>  
                </div>
            </form>
            <button type='submit' onClick={handleSubmit} className='btn-2'>CLAIM YOUR FREE TRIAL</button>
            <p className='footer'>By clicking the button you are agreeing to our <span className='footer-span'>Terms and Services</span></p>
        </div>
   )
}

export default Form;