import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const activeStyles = {
    color: 'white',
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast('Вы вышли из системы');
  };

  return (
    <div className='bg-customColor text-black w-full'>
      <div className="container-fluid mx-auto px-8 py-4 max-w-screen-2xl flex justify-between items-center">
        <div className="flex items-center space-x-4">
        <img src="/end_emblema.png" alt="Логотип" className="h-20" />
          <h1 className="text-2xl font-bold">Glorious Lion</h1>
        </div>
        <nav className="flex-grow">
          <ul className="flex justify-center space-x-10">
            <li>
              <NavLink to="/about" className="text-base hover:text-black" activeStyle={activeStyles}>
                О питомнике
              </NavLink>
            </li>
            <li>
              <NavLink to="/breed" className="text-base hover:text-black" activeStyle={activeStyles}>
                О породе
              </NavLink>
            </li>
            <li>
              <NavLink to="/puppies-for-sale" className="text-base hover:text-black" activeStyle={activeStyles}>
                Щенки на продажу
              </NavLink>
            </li>
            <li>
              <NavLink to="/kennel-dogs" className="text-base hover:text-black" activeStyle={activeStyles}>
                Собаки питомника
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts" className="text-base hover:text-black" activeStyle={activeStyles}>
                Контакты
              </NavLink>
            </li>
            {isAuth && (
              <>
                <li>
                  <NavLink to='/' className='text-base hover:text-black' activeStyle={activeStyles}>
                    Главная
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/posts' className='text-base hover:text-black' activeStyle={activeStyles}>
                    Мои посты
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/new' className='text-base hover:text-black' activeStyle={activeStyles}>
                    Добавить пост
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="ml-10">
          <div className="bg-customColor1 text-base text-white rounded-full px-6 py-3">
            {isAuth ? (
              <button onClick={logoutHandler}>Выйти</button>
            ) : (
              <Link to={'/login'}>Войти</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
