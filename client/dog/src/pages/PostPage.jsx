import axios from '../utils/axios';
import React, { useCallback, useEffect, useState } from 'react';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import { FaDog, FaPaw } from "react-icons/fa";
import Moment from 'react-moment';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removePost } from '../redux/features/auth/post/postSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CommentItem } from '../components/CommentItem';
import { createComment, getPostComments } from '../redux/features/auth/commentSlice';

export const PostPage = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { comments } = useSelector(state => state.comment);
  const dispatch = useDispatch();
  const params = useParams();

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id));
      toast('Пост был удален');
      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!user) {
        // Если пользователь не залогинен, перенаправляем его на страницу авторизации
        toast.error('Для добавления комментария необходимо авторизоваться');
        navigate('/login');
        return;
      }

      const postId = params.id;
      await dispatch(createComment({ postId, comment }));
      setComment('');

      // Показываем уведомление, что комментарий успешно добавлен
      toast.error('Комментарий пустой');
    } catch (error) {
      console.log(error);
      toast.error('Ошибка при добавлении комментария');
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch]);

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`);
      setPost(data);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (!post) {
    return (
      <div className='text-xl text-center text-white py-10'>
        Загрузка...
      </div>
    );
  }

  return (
    <div>
      <button className='flex justify-center items-center bg-customColor1 text-m text-white rounded-sm py-2 px-4'>
        <Link to={'/'}>Назад</Link>
      </button>
      <div className='flex gap-10 py-8'>
        <div className='w-2/3'>
          <div className='flex flex-col basis-1/4 flex-grow'>
            <div className={
              post?.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'
            }>
              {post?.imgUrl && (
                <img src={`http://localhost:3006/${post.imgUrl}`} alt='img' className='object-cover w-full' />
              )}
            </div>
          </div>
          <div className='flex justify-between items-center pt-2'>
            <div className='text-m text-black opacity-50'>{post.username}</div>
            <div className='text-m text-black opacity-50'><Moment date={post.createdAt} format='D MMM YYYY' /></div>
          </div>
       
          <div className='bg-white p-4 rounded'>
            <p className='text-black text-2xl mt-4'>{post.title}</p>
          </div>

          <div className='bg-white p-4 rounded'>
            <p className='text-black opacity-60 text-sm leading-7 whitespace-pre-wrap'>{post.text}</p>
          </div>
          <div className='flex gap-3 items-center mt-2 justify-between'>
            <div className='flex gap-3 mt-4'>
              <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                <FaDog /> <span>{post.views}</span>
              </button>
              <button className='flex items-center justify-center gap-2 text-xs text-black opacity-50'>
                <FaPaw /> <span>{5}</span>
              </button>
            </div>
          </div>
          {
            user?._id !== post.author && (
              <div className='flex gap-3 items-center mt-2 justify-between'>
                <div className='flex gap-3 mt-4'>
                  <button className='flex items-center justify-center gap-2 text-black opacity-80'>
                    <Link to={`/${params.id}/edit`}>
                      <AiTwotoneEdit />
                    </Link>
                  </button>
                  <button onClick={removePostHandler} className='flex items-center justify-center gap-2 text-black opacity-80'>
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            )
          }
        </div>
        <div className='w-1/3 p-8 bg-customColor1 flex flex-col gap-2 rounded-sm'>
          <form className='flex gap-2' onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder='Комментарий'
              className='text-black w-full rounded-sm bg-customColor2 border p-2 text-xs outline-none placeholder:text-gray-700'
            />
            <button
              type='submit'
              onClick={handleSubmit}
              className='flex justify-center items-center bg-gray-600 text-xs rounded-sm py-2 px-4 text-white'
            >
              Добавить
            </button>
          </form>
          <div className='text-l text-black mt-4'>
            <CommentItem />
          </div>
        </div>
      </div>
    </div>
  );
};
