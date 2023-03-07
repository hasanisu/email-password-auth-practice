import { FacebookAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../layout/firebase.init';

const auth = getAuth(app);

const FacebookLoginAuth = () => {
    const [user, setUser]=useState({})


    const facebookProvider= new FacebookAuthProvider();

    const handleToFacebookLogin=()=>{
        signInWithPopup(auth, facebookProvider)
        .then((result)=>{
            const user = result.user;
            setUser(user)
            console.log(user)
        })
        .catch(error=>{
            console.error('error', error)
        })
    }

    return (
        <div>
            <button onClick={handleToFacebookLogin}>Facebook Login</button>
            {
               user.uid && 
               <div> 
                <p>User name: {user.displayName}</p>
                <img src={user.photoURL} alt="" />
                </div> 
            }
        </div>
    );
};

export default FacebookLoginAuth;