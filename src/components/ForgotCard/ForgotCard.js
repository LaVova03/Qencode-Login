import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './ForgotCard.css';
import React, { useState, useEffect } from 'react';
import MainHeader from '../MainHeader/MainHeader';
import InputEmail from '../InputEmail/InputEmail';
import MainButton from '../MainButton/MainButton';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setEmailStore } from '../../redux/Main/actions';
import axios from 'axios';
import { API_URL } from '../../constans/Constants';

const ForgotCard = () => {
    const [isEmail, setEmail] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAccessToken = useSelector(state => state.myReducer?.isAccessToken);

    useEffect(() => {
        if (isEmail) {
            dispatch(setEmailStore(isEmail))
        }
    }, [isEmail, dispatch])

    const verifyAccessToken = async () => {
        try {
            const response = await axios.post(`${API_URL}accesstoken`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${isAccessToken}`
                }
            });

            if (response.status === 200) {
                notifyError('Confirmation was successful.')
                setTimeout(() => {
                    navigate('/create');
                }, 2000)
            } else {
                console.error("Failed to verify access token");
            }
        } catch (error) {
            console.error("Error while verifying access token:", error.message);
            notifyError('Confirmation was not successful, please check your details and try again.')
            return null
        }
    }

    const notifyError = (message) => {
        toast.error(message, {
            position: "top-right",
        });
    };

    return (
        <div>
            <MainHeader isForgot />
            <InputEmail setEmail={setEmail} isForgot />
            <MainButton isSent verifyAccessToken={verifyAccessToken} />
            <MainButton isCancel />
            <ToastContainer />
        </div>
    )
}

export default ForgotCard;
