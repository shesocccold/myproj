import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, checkIsAuth } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status } = useSelector(state => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) toast(status);
    if (isAuth) navigate('/');
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    if (!username || !password) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }

    try {
      dispatch(loginUser({ username, email, password }));
    } catch (error) {
      if (error.message.includes('401')) {
        toast.error('Неверное имя пользователя, email или пароль');
      } else {
        toast.error('Ошибка при попытке входа');
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
        <h1 className='text-3xl text-customColor1 text-center'>Авторизация</h1>
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
          Password:
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Password'
            className='mt-1 text-black w-full rounded-lg bg-white bolder py-1 px-2 text-xL outline-none placeholder:text-gray-700'
          />
        </label>
        <div className='flex gap-8 justify-center mt-4'>
          <button
            type='submit'
            onClick={handleSubmit}
            className='flex justify-center items-center text-xl text-white rounded-sm py-2 px-4'
          >
            Войти
          </button>
          <Link to='/register' className='flex justify-center items-center text-xl text-white'>
            Нет аккаунта?
          </Link>
        </div>
        <div className='flex justify-center mt-4'>
          <Link to='/forgot-password' className='text-xl text-white'>
            Забыли пароль?
          </Link>
        </div>
      </form>
    </div>
  );
};
