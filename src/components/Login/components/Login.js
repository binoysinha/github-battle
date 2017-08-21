import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Login.scss';

const Login = () => {
    return (
        <div className="login">
            <form>
                <input type="text" className="username" placeholder="Route Id" />
                <input type="password" className="password" placeholder="Operator Key" />
                <Link to="/home">
                    <input type="submit" value="Sign In" className="login-btn" alt=""/>
                </Link>
            </form>
            <p> Powered by <span className="rb-text">redBus</span></p>    
        </div>
    )
}

export default Login;