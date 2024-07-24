import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import { Router } from 'express'
import path,{dirname} from 'path'
import { fileURLToPath } from 'url'

//create post
export const CreatePost =async (req,res) =>{
    try{
        const{title, text}=req.body
        const user=await User.findById(req.userId)
        if (!title || !text) {
            return res.status(400).json({ message: 'Необходимо заполнить все обязательные поля (title и text).' });
        }
        if (req.files)
            {
             let fileName= Date.now().toString()+req.files.image.name   
             const __dirname=dirname(fileURLToPath(import.meta.url))
             req.files.image.mv(path.join(__dirname,'..','uploads',fileName))

             const newPostWithImage=new Post({
                username:user.username,
                title,
                text,
                imgUrl:fileName,
                author:req.userId,
             })
             await newPostWithImage.save()
             await User.findByIdAndUpdate(req.userId, {
                $push: {posts:newPostWithImage},

             })
             return res.json(newPostWithImage)
            }

            const newPostWithoutImage=new Post({
                username:user.username,
                title,
                text,
                imgUrl:'',
                author:req.userId,
            })
            await newPostWithoutImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: {posts:newPostWithoutImage},

             })
             return res.json(newPostWithoutImage)
    }catch(error) 
    {
        if (!res.headersSent) {
            return res.json({ message: 'Пост успешно создан' }) // Add return here
          }
    }
}

//get all post
export const GetAll=async (req,res)=>{
    try{
    const posts =await Post.find().sort('-createdAt')
    const popularPosts= await Post.find().limit(5).sort('-views')
    if (!posts)
        {
            return res.json({message:'Постов нет'})
        }
        res.json({posts,popularPosts})
    }catch (error)
    {
        res.json({message:'Что-то пошло не так!'})
    }

}
//get by id
export const GetbyId=async (req,res)=>{
    try{
    const post=await Post.findByIdAndUpdate(req.params.id,{
        $inc:{views:1},
    })
        res.json(post)
    }catch (error)
    {
        res.json({message:'Что-то пошло не так((((('})
    }

}
export const GetMyPosts=async (req,res)=>{
    try {
        const posts = await Post.find({ username: 'test12' }).sort('-createdAt');
        const popularPosts = await Post.find({ username: 'test12' }).limit(5).sort('-views');
      
        if (!posts || posts.length === 0) {
          return res.json({ message: 'Постов от пользователя "test12" нет' });
        }
      
        res.json({ posts });
      } catch (error) {
        console.error('Ошибка при получении постов:', error);
        res.json({ message: 'Что-то пошло не так(((' });
      }
      
}
//remove post
export const removePost=async (req,res)=>{
    try{
    const post = await Post.findByIdAndDelete(req.params.id)
   if(!post)
    return res.status(400).json({message:'Что-то пошло не так'})
    await User.findByIdAndUpdate(req.UserId,{
        $pull: {posts: req.params.id}
    })
        res.json({message:'Пост был удален'})
    }catch (error)
    {
        res.json({message:'Что-то пошло не так(('})
    }

}
//updatePost
export const updatePost=async (req,res)=>{
    try{
   const {title, text, id} = req.body
   const post= await Post.findById(id)
   if (req.files)
    {
     let fileName= Date.now().toString()+req.files.image.name   
     const __dirname=dirname(fileURLToPath(import.meta.url))
     req.files.image.mv(path.join(__dirname,'..','uploads',fileName))
    post.imgUrl=fileName ||''}
    post.title=title
    post.text=text
    await post.save()

        res.json(post)
    }catch (error)
    {
        res.status(400).json({message:'Нет доступа к данным изменениям.'})
    }

}
export const getPostComments=async (req,res)=>{
    try{
        const post =await Post.findById(req.params.id)
        const list=await Promise.all(
            post.comments.map((comment)=>{
                return Comment.findById(comment)
            }),
        )
            res.json(list)
    }catch(error)
    {
        res.json({message:'Что=то пошло не так'})
    }
}