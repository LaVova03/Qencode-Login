import './InputPassword.css';
import React, { useEffect, useState } from 'react';

const InputPassword = ({ reset, setReset, setLengthLogin, setLength, isComparison, setData, isData, isPassword, setPassword, isCreate, isCheckPassword, isCheck, setCheck, isLoginPassword }) => {

    const [isEae, setEae] = useState(false);
    const [password, addPassword] = useState('');
    const [isConfirm, setConfirm] = useState('');
    const [isReges, setRegex] = useState(false);
    const [isRegesConfirm, setRegexConfirm] = useState(false);

    const validatePassword = (password) => {
        const regexEmail = /^(?=.*[A-Za-z0-9]).{8,}$/.test(
            password
        );
        return regexEmail
    }

    useEffect(() => {
        if (reset) {
            addPassword('');
            setConfirm('');
            setReset(false);
        }
    }, [reset, setReset])

    useEffect(() => {
        if (password && isLoginPassword) {
            if (password.length >= 8) {
                setLengthLogin(true)
            } else {
                setLengthLogin(false)
            }
            const resultRegex = validatePassword(password);
            if (resultRegex) {
                setRegex(true);
                setData((prev) => ({
                    ...prev,
                    password: password,
                }))
            } else {
                setRegex(false);
            }
        } else if (password && isCreate) {
            if (password.length >= 8) {
                setLength(true)
            } else {
                setLength(false)
            }
            const resultRegex = validatePassword(password);
            if (resultRegex) {
                setRegex(true);
                setPassword(password);
            } else {
                setRegex(false);
            }
        } else if (isConfirm && isCheckPassword) {
            const resultRegex = validatePassword(isConfirm);
            if (resultRegex) {
                setRegexConfirm(true);
                setCheck(isConfirm);
            } else {
                setRegexConfirm(false);
            }
        }
    }, [password, setLengthLogin, setLength, isData, isConfirm, setData, isLoginPassword, isCreate, setCheck, setPassword, isCheckPassword, isCheck, isPassword])

    return (
        <div className='input__password__container'>
            {isCreate ?
                <label className='password__label'>Password</label>
                : isCheckPassword ?
                    <label className='password__label'>Confirm Password</label>
                    : null}
            <div className={`input__password__wrap${isCreate ? '2' : isCheckPassword ? '3' : ""}`}>
                <input
                    type={isEae ? 'text' : 'password'}
                    name='password'
                    className='input__password__main'
                    placeholder='Password'
                    value={(isCreate || isLoginPassword) ? password : (isCheckPassword ? isConfirm : '')}
                    onChange={(e) => {
                        isCheckPassword ?
                            setConfirm(e.target.value)
                            : addPassword(e.target.value)
                    }}
                    style={{
                        border:
                            (isLoginPassword || isCreate) && !isReges && password ? "1px solid red"
                                : (isLoginPassword || isCreate) && isReges ? "1px solid green"
                                    : (isLoginPassword || isCreate) && !password ? ""
                                        : (isCheckPassword && !isRegesConfirm && isConfirm) ? "1px solid red"
                                            : (isCheckPassword && isRegesConfirm && !isComparison) ? "1px solid red"
                                                : (isCheckPassword && isRegesConfirm && isComparison) ? "1px solid green"
                                                    : ""

                    }}
                />
                <button
                    className='input__eye__close'
                    onClick={() => setEae((prev) => !prev)}
                />
            </div >
        </div>
    );
}

export default InputPassword;
