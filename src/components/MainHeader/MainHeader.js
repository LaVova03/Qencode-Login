import './MainHeader.css';
import Image from '../../assets/Logo.png';

const MainHeader = ({ isForgot, isCreate }) => {
    return (
        <div className='main__header__wrap'>
            <img className='img__main' src={Image} alt='logo'></img><br />
            <label
                className='main__header'>
                {
                    isForgot ? "Forgot Password?"
                        : isCreate ? "Create new Password?"
                            : "Log in to your account"
                }
            </label>
        </div>
    )
}

export default MainHeader;