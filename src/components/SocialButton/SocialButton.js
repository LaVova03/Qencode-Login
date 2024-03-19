import './SocialButton.css';
import Google from '../../assets/Google.png';
import Git from '../../assets/Git.png';

const SocialButton = ({ isGoogle }) => {
    return (
        <div className='social__main__wrap'>
            <div className='btn__social__wrap'>
                <button className='btn__social'>
                    <img
                        className={`img__social__${isGoogle ? 'google' : 'git'}`}
                        src={isGoogle ? Google : Git}
                        alt='logo' />
                    {isGoogle ? "Google" : "Github"}
                </button>
            </div>
        </div>
    )
}

export default SocialButton;