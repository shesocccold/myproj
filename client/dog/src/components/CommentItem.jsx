import React from 'react';
import { FaHeart } from 'react-icons/fa'; // Импортируем иконку сердечка

export const CommentItem = () => {
  // Пример массива комментариев
  const comments = [
    {
      initials: 'АМ',
      author: 'Анна Маркова',
      text: 'Посоветуйте средства для мытья?'
    },
    {
      initials: 'GL',
      author: 'Glorious Lion',
      text: 'Анна! Добрый день, все средства выложу в следующем посту.',
      avatar: '/first_dog.png' // добавляем ссылку на изображение аватара
    },
    {
      initials: 'ГИ',
      author: 'Григорий Иванов',
      text: 'Спасибо за такой пост!'
    },
    {
      initials: 'МА',
      author: 'Марина Александровна',
      text: 'Как часто происходит линька у собаки?'
    },
    {
      initials: 'GL',
      author: 'Glorious Lion',
      text: 'Марина! Добрый день, Акита линяет два раза в год, весной и осенью!.',
      avatar: '/first_dog.png' // добавляем ссылку на изображение аватара
    }
  ];

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index} className='bg-white p-4 rounded mb-4 relative'>
          <div className='flex items-start gap-3'>
            <div className='flex items-center justify-center rounded-full w-10 h-10 bg-blue-300 text-sm text-white'>
              {comment.avatar ? (
                <img src={comment.avatar} alt='Avatar' className='w-full h-full rounded-full object-cover' />
              ) : (
                comment.initials
              )}
            </div>
            <div>
              <div className='text-black font-bold'>{comment.author}</div>
              <div className='text-black'>{comment.text}</div>
            </div>
          </div>
          <div className='absolute bottom-0 right-0 p-1'>
            <FaHeart className='text-red-500' />
          </div>
        </div>
      ))}
    </div>
  );
};

