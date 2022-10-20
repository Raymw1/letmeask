import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/auth.scss';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';
import { get, ref } from 'firebase/database';
import { database } from '../services/firebase';

export function Home() {
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  const navigate = useNavigate();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    navigate('/rooms/new');
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();
    if (roomCode.trim() === '') return;
    const roomRef = await get(ref(database, `rooms/${roomCode}`));
    if (!roomRef.exists()) return alert('Room does not exists!');
    if (roomRef.val().endedAt) return alert('Room has been already closed!');
    navigate(`/rooms/${roomCode}`);
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
          <button className='create-room' onClick={handleCreateRoom}>
            <img src={googleIconImg} alt='Google' />
            Create your room with Google
          </button>
          <div className='separator'>or join a room</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='Use a room code'
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <Button type='submit'>Join the room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
