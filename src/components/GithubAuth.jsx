import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../layout/firebase.init';


const auth = getAuth(app);

const GithubAuth = () => {
    const [user, setUser]=useState({})

    const githubProvider = new GithubAuthProvider();

    const handleToGithubSignIn=()=>{
        signInWithPopup(auth, githubProvider)
        .then(result=>{
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
            <button onClick={handleToGithubSignIn}>GitHub Sign In</button>

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

export default GithubAuth;