import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import '../styles/room.scss';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

type RoomParams = {
  id: string
}

export function Room() {
  const params = useParams() as RoomParams;

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='Letmeask' />
          <RoomCode code={params.id} />
        </div>
      </header>
      <main>
        <div className='room-title'>
          <h1>Room name</h1>
          <span>4 questions</span>
        </div>
        <form onSubmit={() => {}}>
          <textarea placeholder='How can I help you?' />
          <div className='form-footer'>
            <span>
              To ask a question, <button type='button'>login here</button>
            </span>
            <Button type='submit'>Send question</Button>
          </div>
        </form>
      </main>
    </div>
  );
}
