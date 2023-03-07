import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../layout/firebase.init';

const auth = getAuth(app)
const LoginPage = () => {
    const [success, setSuccess] = useState(false)
    const [userEmail, setUserEmail] = useState('');

    const handleToLogin = event => {
        event.preventDefault();
        setSuccess(false)
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                form.reset();
                console.log(user)
                setSuccess(true)
                
            })
            .catch(error => {
                console.error('error', error)
            })
    }

    const handleToEmail = (event) => {
        const email = event.target.value;
        setUserEmail(email)
        
        console.log(email)
    }
    const resetPassword = () => {
        if (!userEmail) {
            alert('please enter your email address')
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('password reset sent')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-danger'>Login Page</h2>
            <form onSubmit={handleToLogin}>
                <div className="mb-3" >
                    <label htmlFor="formGroupExampleInput" className="form-label">Your Email</label>
                    <input onBlur={handleToEmail} name='email' type="email" className="form-control" id="formGroupExampleInput" placeholder="Enter your Email" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Your Password</label>
                    <input name='password' type="password" className="form-control" id="formGroupExampleInput2" placeholder="Enter your Pasword" required />
                </div>
                <p className='text-danger'>{success && 'you have login successfuly'}</p>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p>
                If you do not have an accout please Register
                <Link to="/register"><button type="button" className="btn btn-link">singup</button></Link>
            </p>
            <p><small>Forget Your Password? <button onClick={resetPassword} type="button" className="btn btn-link">Forget Password</button></small></p>

        </div>
    );
};

export default LoginPage;