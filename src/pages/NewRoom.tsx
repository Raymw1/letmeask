import '../styles/auth.scss';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

export function NewRoom() {
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
          <h2>Create a new room</h2>
          <form>
            <input type='text' placeholder='Room name' />
            <Button type='submit'>Create room</Button>
          </form>
          <p>Join another room <a href='#'>here</a>.</p>
        </div>
      </main>
    </div>
  );
}
