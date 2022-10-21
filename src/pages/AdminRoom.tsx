import { useNavigate, useParams } from 'react-router-dom';

import '../styles/room.scss';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import {
  DatabaseReference,
  onValue,
  ref,
  remove,
  update,
} from 'firebase/database';
import { database } from '../services/firebase';
import { useEffect } from 'react';

let getQuestionRef: (questionId: string) => DatabaseReference;

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
  isAnswered: boolean;
  isHighlighted: boolean;
};

export function AdminRoom() {
  const params = useParams() as RoomParams;
  const roomId = params.id;
  const { user } = useAuth();
  const { questions, title } = useRoom(roomId);

  const navigate = useNavigate();

  useEffect(() => {
    getQuestionRef = (questionId: string) =>
      ref(database, `rooms/${roomId}/questions/${questionId}`);
  }, [roomId]);

  async function handleEndRoom() {
    const roomRef = ref(database, `rooms/${roomId}`);
    await update(roomRef, { endedAt: new Date() });
    navigate('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    const confirmation = window.confirm(
      'Do you really want to remove this question?'
    );
    if (!confirmation) return;
    const questionRef = getQuestionRef(questionId);
    await remove(questionRef);
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    const questionRef = getQuestionRef(questionId);
    await update(questionRef, { isAnswered: true });
  }

  async function handleHighlightQuestion(questionId: string) {
    const questionRef = getQuestionRef(questionId);
    await update(questionRef, { isHighlighted: true });
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImg} alt='Letmeask' />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Remove room
            </Button>
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
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type='button'
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt='Mark question as answered' />
                  </button>
                  <button
                    type='button'
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt='Highlight question' />
                  </button>
                </>
              )}
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
