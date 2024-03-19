import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './CreateCard.css';
import React, { useEffect, useState } from 'react';
import MainHeader from '../MainHeader/MainHeader';
import InputPassword from '../InputPassword/InputPassword';
import MainButtom from '../MainButton/MainButton';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../../constans/Constants';

const CreateCard = () => {

    const [isPassword, setPassword] = useState('');
    const [isCheck, setCheck] = useState('');
    const [isComparison, setComparison] = useState(false);
    const [isLength, setLength] = useState(false);
    const [reset, setReset] = useState(true);

    const isEmailStore = useSelector(state => state.myReducer?.isEmailStore);
    const isAccessToken = useSelector(state => state.myReducer?.isAccessToken);
    const isRefreshToken = useSelector(state => state.myReducer?.isRefreshToken);

    useEffect(() => {
        if (isPassword === isCheck) {
            setComparison(true)
        } else {
            setComparison(false)
        }
    }, [isPassword, isCheck, isLength])

    const passwordReset = async () => {
        if (isComparison && isLength) {
            try {
                const response = await axios.post(`${API_URL}passwordreset`, {
                    "email": isEmailStore
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 422) {
                    setNewPassword();
                } else {
                    console.error("Failed to reset password");
                }
            } catch (error) {
                console.error("Error while resetting password:", error.message);
            }
        } else if ((!isPassword || !isCheck) || !isLength) {
            notifyError('The password must be at least 8 characters long.')
        } else {
            notifyError('The password of the first line does not match the second, try again.')
        }
    }

    const setNewPassword = async () => {
        try {
            const response = await axios.post(`${API_URL}passwordset`, {
                "token": isAccessToken,
                "secret": isRefreshToken,
                "password": isPassword,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setReset(true);
            setPassword('');
            setCheck('');
            console.log(response.data);
            notifyError('Password has been changed.');
        } catch (error) {
            console.error(error.message);
            notifyError('Something went wrong, please try again.')
        }
    }

    const notifyError = (message) => {
        toast.error(message, {
            position: "top-right",
        });
    };

    return (
        <div>
            <MainHeader isCreate />
            <InputPassword isPassword={isPassword} setPassword={setPassword} isCreate setLength={setLength}
                reset={reset} setReset={setReset} />
            <InputPassword isCheckPassword isCheck={isCheck} setCheck={setCheck} isComparison={isComparison}
                reset={reset} setReset={setReset} />
            <MainButtom isCreate passwordReset={passwordReset} />
            <ToastContainer />
        </div>
    )
}

export default CreateCard;