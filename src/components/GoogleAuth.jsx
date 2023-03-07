import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import app from '../layout/firebase.init';

const auth = getAuth(app)
const GoogleAuth = () => {
const googleProvider = new GoogleAuthProvider();
    
const handleGoogleSignIn=()=>{

    signInWithPopup(auth, googleProvider)
    .then(result=>{
        const user = result.user;
        console.log(user)
    })
    .catch(error=>{
        console.error('error', error)
    })
    }

    return (
        <div>
            <button onClick={handleGoogleSignIn}>SignIn with Google</button>
        </div>
    );
};

export default GoogleAuth;