import React from 'react';
import { Outlet, Link } from 'react-router-dom';


const Main = () => {
    return (
        <div>
            <Link to='login'>Login</Link>
            <Link to='register'>Register</Link>
            <Link to='google'>Google</Link>
            <Link to='github'>GitHub</Link>
            <Link to='facebook'>Facebook</Link>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;