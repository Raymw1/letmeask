import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import '../styles/room.scss';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { ref, remove } from 'firebase/database';
import { database } from '../services/firebase';

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

  async function handleDeleteQuestion(questionId: string) {
    const confirmation = window.confirm(
      'Do you really want to remove this question?'
    );
    if (!confirmation) return;
    const questionRef = ref(
      database,
      `rooms/${roomId}/questions/${questionId}`
    );
    await remove(questionRef);
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
            >
              <button
                type='button'
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt='Remove question' />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
