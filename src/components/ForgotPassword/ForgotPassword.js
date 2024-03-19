import './ForgotPassword.css';
import React from 'react';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const navigate = useNavigate();

    return (
        <div className='forgot__password__wrap'>
            <button
                className='forgot__password__btn'
                onClick={() => navigate('/forgot')}
            >
                Forgot your password?
            </button>
        </div>
    )
}

export default ForgotPassword;