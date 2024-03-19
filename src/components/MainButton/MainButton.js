import "./MainButton.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const MainButtom = ({ isCancel, isSent, isCreate, enterMyAccount, isEnter, verifyAccessToken, passwordReset }) => {

    const navigate = useNavigate();

    return (
        <div className="btn__wrap">
            <button
                className={`btn__${isCancel ? "cancel" : "main"}`}
                onClick={
                    isSent ? verifyAccessToken
                        : isEnter ? enterMyAccount
                            : isCancel ? () => navigate('/')
                                : isCreate ? passwordReset
                                    : null}
            >
                {isCancel ? "Cancel" : isSent ? "Sent" : isCreate ? "Reset Password" : "Log in to Qencode"}
            </button>
        </div >
    )
}

export default MainButtom;