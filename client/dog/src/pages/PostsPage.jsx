import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

 export const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const { data } = await axios.get('/posts/');
        setPosts(data.posts);
      } catch (error) {
        console.error('Ошибка при загрузке постов:', error);
      }
    };

    fetchMyPosts();
  }, []);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Мои посты</h1>
      {posts?.length > 0 ? (
        <ul className='space-y-6'>
          {posts.map((post) => (
            <li key={post._id} className='border rounded-md p-4'>
              <h2 className='text-xl font-semibold mb-2'>{post.title}</h2>
              <p className='text-gray-700'>{post.text}</p>
              <p className='text-gray-500 mt-2'>Автор: {post.username}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-gray-700'>Нет доступных постов</p>
      )}
    </div>
  );
};

export default PostsPage;
