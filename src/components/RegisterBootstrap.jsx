import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth';
import app from '../layout/firebase.init.js';

const auth = getAuth(app);

const RegisterBootstrap = () => {
const [success, setSuccess] = useState('');
const [passwordError, setPasswordError] = useState(false);
    const handleToRegister = event=>{
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const name= form.name.value;
        console.log(email, password)

        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordError('please input at least two upper case')
            return;
        }
        if(password.length < 6){
            setPasswordError('please input at least 6 digit')
            return;
        }
        if(!/(?=.*[!@#$&*?])/.test(password)){
            setPasswordError('please input at least special character')
            return;
        }
        setPasswordError('')

        createUserWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const user = result.user;
            setSuccess(user);
            form.reset();
            verifyEmail();
            updateUserName(name)
            console.log(user);

        })
        .catch(error=>{
            console.error('error', error)
            setPasswordError(error.message);
        })
    }

    const verifyEmail=()=>{
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            alert('Email varificaion sent into your mail')
        })
        
    }
    const updateUserName=(name)=>{
        updateProfile(auth.currentUser,{
            displayName: name
        })
        .then(()=>{
            console.log('display name updated')
        })
        .catch(error=> console.error(error))
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>This is Register page</h2>

            <Form onSubmit={handleToRegister} >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Enter Name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Your Email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Your Password" required/>
                </Form.Group>
                <div className='text-success fs-4'>
                {success && 'you have successfully Register'}
                </div>
                <p className='text-primary'>{passwordError}</p>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default RegisterBootstrap;