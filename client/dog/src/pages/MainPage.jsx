import React, { useEffect } from 'react';
import { PostItems } from '../components/PostItems';
import { PopularPosts } from '../components/PopularPosts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/features/auth/post/postSlice';

export const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts.length) {
    return (
      <div className='text-xl text-center text-black py-10'>
        Постов не существует
      </div>
    );
  }

  return (
    <div className='max-w-[900px] mx-auto py-10'>
      <div className='flex justify-between gap-8'>
        <div className='flex flex-col gap-10 basis-4/5'>
          {posts?.map((post, idx) => (
            <PostItems key={idx} post={post} />
          ))}
        </div>
        <div className='basis-2/5'>
          <div className='bg-white p-4 rounded'>
            <div className='text-xl text-customColor1 mb-4'>Популярные:</div>
            {popularPosts?.map((post, idx) => (
              <PopularPosts key={idx} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
