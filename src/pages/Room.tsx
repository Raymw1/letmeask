import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import '../styles/room.scss';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { push, ref } from 'firebase/database';
import { database } from '../services/firebase';

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();

  const [newQuestion, setNewQuestion] = useState('');

  const params = useParams() as RoomParams;
  const roomId = params.id;

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') return;
    if (!user) throw new Error('You must be logged in!');
    const question = {
      content: newQuestion,
      author: { name: user.name, avatar: user.avatar },
      isHighlighted: false,
      isAnswered: false,
    };
    await push(ref(database, `rooms/${roomId}/questions`), question);
    setNewQuestion('');
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='Letmeask' />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main>
        <div className='room-title'>
          <h1>Room name</h1>
          <span>4 questions</span>
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder='How can I help you?'
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <div className='form-footer'>
            {user ? (
              <div className='user-info'>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                To ask a question, <button type='button'>login here</button>
              </span>
            )}
            <Button type='submit' disabled={!user}>
              Send question
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
