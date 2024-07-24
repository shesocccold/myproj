import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../redux/features/auth/post/postSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // импорт библиотеки toast

export const AddPostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      // Проверка на пустые поля
      if (!title || !text) {
        toast.error('Необходимо заполнить все поля');
        return;
      }

      const data = new FormData();
      data.append('title', title);
      data.append('text', text);
      data.append('image', image);
      await dispatch(createPost(data));
      toast.success('Пост успешно добавлен'); // уведомление при успешном добавлении поста
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Ошибка при добавлении поста');
    }
  };

  const clearFormHandler = () => {
    setText('');
    setTitle('');
  };

  return (
    <form
      className='w-1/3 mx-auto py-10 mt-40'
      onSubmit={(e) => e.preventDefault()}
    >
      <label className='text-gray-300 py-2 bg-customColor1 text-xl mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
        Прикрепить картинку:
        <input type='file' className='hidden' onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <div className='flex object-cover py-2'>
        {image && <img src={URL.createObjectURL(image)} alt='image' />}
      </div>
      <label className='text-xl text-black opacity-70 mt-20'>
        Введите заголовок поста:
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Заголовок'
          className='mt-1 text-black w-full rounded-lg bg-customColor2 border py-1 px-2 text-xl outline-none placeholder:text-gray-700'
        />
      </label>
      <label className='text-xl text-black opacity-70 mt-20'>
        Введите текст поста:
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder='Текст поста'
          className='mt-1 text-black w-full rounded-lg bg-customColor2 border py-1 px-2 text-xl outline-none resize-none h-40 placeholder:text-gray-700'
        />
      </label>
      <div className='flex gap-8 items-center justify-center mt-4'>
        <button onClick={submitHandler} className='flex justify-center items-center bg-customColor1 text-xl text-white rounded-sm py-2 px-4'>
          Добавить
        </button>
        <button onClick={clearFormHandler} className='flex justify-center items-center bg-customColor1 text-xl text-white rounded-sm py-2 px-4'>
          Выйти
        </button>
      </div>
    </form>
  );
};

