import React from 'react';
import { FaDog, FaPaw } from 'react-icons/fa';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export const PostItems = ({ post }) => {
  if (!post) {
    return (
      <div className='text-xl text-center text-white py-10'>
        Загрузка...
      </div>
    );
  }

  return (
    <Link to={`/${post._id}`}>
      <div className='bg-white p-4 rounded mb-4'>
        <div className='text-xs uppercase text-black opacity-50 mb-2'>Перейти к обсжудению:</div>
        <div className={post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
          {post.imgUrl && (
            <img src={`http://localhost:3006/${post.imgUrl}`} alt='img' className='object-cover w-full' />
          )}
        </div>
        <div className='flex justify-between items-center pt-2'>
          <div className='text-xs text-black opacity-50'>{post.username}</div>
          <div className='text-xs text-black opacity-50'><Moment date={post.createdAt} format='D MMM YYYY' /></div>
        </div>
        <div className='text-black text-xl mt-2'>{post.title}</div>
        <p className='text-black opacity-60 text-xs pt-2 line-clamp-4'>{post.text}</p>
        <div className='flex gap-3 items-center mt-2'>
          <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
            <FaDog /> <span>{post.views}</span>
          </button>
          <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
            <FaPaw /> <span>{post.comments?.length}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};
