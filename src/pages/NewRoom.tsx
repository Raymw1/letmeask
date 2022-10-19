import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/auth.scss';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';

import { push, ref } from 'firebase/database';
import { database } from '../services/firebase';

export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setRoom] = useState('');

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();
    if (newRoom.trim() === '') return;
    const roomRef = ref(database, 'rooms');
    const firebaseRoom = await push(roomRef, {
      title: newRoom,
      authorId: user?.id,
    });
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
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Room name'
              value={newRoom}
              onChange={(e) => setRoom(e.target.value)}
            />
            <Button type='submit'>Create room</Button>
          </form>
          <p>
            Join another room <Link to='/'>here</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}
