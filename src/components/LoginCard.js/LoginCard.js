import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './LoginCard.css';
import React, { useState, useEffect } from 'react';
import MainButton from '../MainButton/MainButton';
import MainHeader from '../MainHeader/MainHeader';
import SocialButton from '../SocialButton/SocialButton';
import HorizontLine from '../HorizontLine/HorizontLine';
import Footer from '../Footer/Footer';
import InputEmail from '../InputEmail/InputEmail';
import InputPassword from '../InputPassword/InputPassword';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAccessToken, setRefreshToken } from '../../redux/Main/actions';
import { API_URL } from '../../constans/Constants';

const LoginCard = () => {

    const [isPassword, showPassword] = useState(false);
    const [isLengthLogin, setLengthLogin] = useState(false);
    const [isData, setData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (isData.email) {
            showPassword(true)
        } else {
            showPassword(false)
        }
    }, [isData])

    const dispatch = useDispatch();

    const enterMyAccount = async () => {
        if (isPassword && isLengthLogin) {
            try {
                const response = await axios.post(`${API_URL}login`, {
                    "email": isData.email,
                    "password": isData.password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    const accessToken = response.data.access_token;
                    const refreshToken = response.data.refresh_token;
                    dispatch(setAccessToken(accessToken));
                    dispatch(setRefreshToken(refreshToken));
                    notifyError('You are logged in to your account');
                }
            } catch (error) {
                console.error(error.message);
                notifyError('The password or email is incorrect, or the account is not registered');
            }
        } else if (!isPassword) {
            notifyError('Please enter correct information in your email.')
        } else if (!isLengthLogin) {
            notifyError('Please enter correct information in your password, at least 8 characters.')
        }
    }

    const notifyError = (message) => {
        toast.error(message, {
            position: "top-right",
        });
    };

    return (
        <div>
            <MainHeader />
            <div className={`social__wrap${isPassword ? ' show' : ''}`}>
                <SocialButton isGoogle />
                <SocialButton />
            </div>
            <HorizontLine />
            <InputEmail setData={setData} showPassword={showPassword} isEmailInput />
            <div className={`login__input${isPassword ? '__show' : ''}`}>
                <InputPassword setData={setData} setLengthLogin={setLengthLogin} isLoginPassword />
                <ForgotPassword />
            </div>
            <div className={`login__btn${isPassword ? '__show' : ''}`}>
                <MainButton enterMyAccount={enterMyAccount} isEnter />
                <Footer />
            </div>
            <ToastContainer />
        </div>
    );
}

export default LoginCard;
