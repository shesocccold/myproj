import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, checkIsAuth } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isAuth = useSelector(checkIsAuth);
  const { status } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) {
      navigate('/');
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    if (!username || !password) {
      toast.error('Заполните все поля');
      return;
    }

    try {
      dispatch(registerUser({ username, password }));
      setPassword('');
      setUsername('');
    } catch (error) {
      if (error.message.includes('409')) {
        toast.error('Пользователь с таким именем уже зарегистрирован');
      } else {
        toast.error('Ошибка при регистрации');
      }
      console.log(error);
    }
  };

  return (
    <div
    className="w-full h-screen flex justify-center items-center"
    style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/fon_first1.png)`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <form onSubmit={e => e.preventDefault()} className="w-1/4 h-60 mx-auto mt-40">
    <h1 className='text-3xl text-customColor1 text-center'>Регистрация</h1>
      <label className='text-m text gray-400'>
        Username:
        <input
          type='text'
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder='Username'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 bolder py-1 px-2 text-xl outline-none placeholder:text-gray-700'
        />
      </label>
     
        <label className='text-m text gray-400'>
          Email:
          <input
            type='email'
           
           
            placeholder='Email'
            className='mt-1 text-black w-full rounded-lg bg-gray-400 bolder py-1 px-2 text-xl outline-none placeholder:text-gray-700'
          />
        </label>
      <label className='text-m text gray-400'>
        Password:
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
          className='mt-1 text-black w-full rounded-lg bg-gray-600 bolder py-1 px-2 text-xl outline-none placeholder:text-gray-700'
        />
      </label>
      <div className='flex gap-8 justify-center mt-4'>
        <button
          type='submit'
          onClick={handleSubmit}
          className='flex justify-center items-center text-xl text-white rounded-sm py-2 px-4'
        >
          Подтвердить
        </button>
        <Link to='/login' className='flex justify-center items-center text-xl text-white'>
          Уже зарегистрированы?
        </Link>
      </div>
    </form>
    </div>
  );
};
