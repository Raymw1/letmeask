import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import '../styles/room.scss';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { push, ref } from 'firebase/database';
import { database } from '../services/firebase';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
  id: string;
};

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
};

export function AdminRoom() {
  const params = useParams() as RoomParams;
  const roomId = params.id;
  const { user } = useAuth();
  const { questions, title } = useRoom(roomId);

  const [newQuestion, setNewQuestion] = useState('');

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
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Remove room</Button>
          </div>
        </div>
      </header>
      <main>
        <div className='room-title'>
          <h1>Room {title}</h1>
          {questions?.length > 0 && (
            <span>{questions?.length} question(s)</span>
          )}
        </div>
        <div className='question-list'>
          {questions.map((question: QuestionType) => (
            <Question
              content={question.content}
              author={question.author}
              key={question.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
