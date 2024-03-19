import './InputEmail.css';
import React, { useEffect, useState } from 'react';

const InputEmail = ({ setData, setEmail, isForgot, showPassword, isEmailInput }) => {

    const [email, addEmail] = useState('');
    const [isReges, setRegex] = useState(false);

    const validateEmail = (login) => {
        const regexEmail = /^[a-zA-Z0-9=!@#$%^&*()_{}+|:"<>?[\],.';~`\\-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{1,}$/.test(
            login
        );
        return regexEmail
    }

    useEffect(() => {
        if (email && isEmailInput) {
            const resultRegex = validateEmail(email);
            if (resultRegex) {
                setRegex(true);
                showPassword(true);
                setData((prev) => ({
                    ...prev,
                    email: email,
                }))
            } else {
                setRegex(false);
                showPassword(false);
            }
        } else if (email && isForgot) {
            const resultRegex = validateEmail(email);
            if (resultRegex) {
                setRegex(true);
                setEmail(email);
            } else {
                setRegex(false);
            }
        }
    }, [email, setData, showPassword, isForgot, isEmailInput, setEmail])

    return (
        <div className='input__email__wrap'>
            <input
                type='text'
                name='email'
                className='input__email__main'
                placeholder={isForgot ? 'Enter your email' : 'Work email'}
                value={email || ''}
                onChange={(e) => {
                    addEmail(e.target.value)
                }}
                style={{
                    border:
                        !isReges && email ? "1px solid red" : isReges ? "1px solid green" : "",
                }}
            />
        </div>
    )
}

export default InputEmail;
