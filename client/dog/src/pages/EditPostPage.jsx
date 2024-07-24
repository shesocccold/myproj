import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios';
import { updatePost } from '../redux/features/auth/post/postSlice';
import { toast } from 'react-toastify'; // импорт библиотеки toast

export const EditPostPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState(null); // изменено на null, чтобы правильно обрабатывать удаление изображения
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`);
      setTitle(data.title);
      setText(data.text);
      setOldImage(data.imgUrl);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    }
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const submitHandler = async () => {
    try {
      // Проверка на пустой текст поста
      if (!title || !text) {
        toast.success('Пост удален!');
        return;
      }

      const updatedPost = new FormData();
      updatedPost.append('id', params.id);
      updatedPost.append('title', title);
      updatedPost.append('text', text);
      if (newImage) {
        updatedPost.append('image', newImage);
      }

      await dispatch(updatePost(updatedPost));
      toast.success('Пост успешно обновлен');
      navigate('/posts');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Ошибка при обновлении поста');
    }
  };

  const clearFormHandler = () => {
    setTitle('');
    setText('');
    setNewImage(null);
  };

  return (
    <form className='w-1/3 mx-auto py-10' onSubmit={(e) => e.preventDefault()}>
      <label className='text-gray-300 py-2 bg-gray-600 text-xl mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
        Прикрепить картинку:
        <input
          type='file'
          className='hidden'
          onChange={(e) => {
            setNewImage(e.target.files[0]);
            setOldImage('');
          }}
        />
      </label>
      <div className='flex object-cover py-2'>
        {oldImage && <img src={`http://localhost:3006/${oldImage}`} alt='old_image' />}
        {newImage && <img src={URL.createObjectURL(newImage)} alt='new_image' />}
      </div>
      <label className='text-xl text-black opacity-70'>
         Изменить заголовок поста:
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Заголовок'
          className='mt-1 text-black w-full rounded-lg bg-customColor1 border py-1 px-2 text-xl outline-none placeholder:text-gray-700'
        />
      </label>
      <label className='text-xl text-black opacity-70 mt-4'>
        Изменить текст поста:
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder='Текст поста'
          className='mt-1 text-black w-full rounded-lg bg-customColor1 border py-1 px-2 text-xl outline-none resize-none h-40 placeholder:text-gray-700'
        />
      </label>
      <div className='flex gap-8 items-center justify-center mt-4'>
        <button onClick={submitHandler} className='flex justify-center items-center bg-gray-600 text-xl text-white rounded-sm py-2 px-4'>
          Обновить
        </button>
        <button onClick={clearFormHandler} className='flex justify-center items-center bg-gray-600 text-xl text-white rounded-sm py-2 px-4'>
          Выйти
        </button>
      </div>
    </form>
  );
};
