import { useNavigate } from 'react-router-dom';

import '../styles/auth.scss';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

export function Home() {
  const navigate = useNavigate();

  function navigateToNewRoom() {
    navigate('/rooms/new');
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrationImg} alt='Questions and Answers' />
        <strong>Create Q&amp;A live rooms</strong>
        <p>Clear you audience's doubts in real time</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='Letmeask' />
          <button className='create-room' onClick={navigateToNewRoom}>
            <img src={googleIconImg} alt='Google' />
            Create your room with Google
          </button>
          <div className='separator'>or join a room</div>
          <form>
            <input type='text' placeholder='Use a room code' />
            <Button type='submit'>Join the room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}