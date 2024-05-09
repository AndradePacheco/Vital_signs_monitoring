import Header from '../components/header';
import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import '../styles/homeScreen.css';
import login from '../assets/images/login.png';
import register from '../assets/images/register.png';


function HomeScreen() {
    return (
        <>
            <Header />
            <div className='home-container'>
                <div className='home-inside-container description'>
                    <h1 className='home-title'>Take care of your health</h1>
                    <span className='home-text'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </span>
                    <div className='buttons'>
                        <button className='button sign-in'>
                            <span><Image className='icon' src={login} /></span>
                            <Link to="/login"><span className='icon-text'>Sign In</span></Link>
                        </button>
                        <button className='button sign-up'>
                            <span><Image className='icon' src={register} /></span>
                            <Link to="register"><span className='icon-text'>Sign Up</span></Link>
                        </button>
                    </div>
                </div>
                <div className='home-inside-container empty'>
                </div>
            </div>
        </>
    );
}

export default HomeScreen;