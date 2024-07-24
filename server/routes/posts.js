import {Router} from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { CreatePost,GetAll ,GetbyId,GetMyPosts, removePost, updatePost, getPostComments} from '../controllers/posts.js'
 const router =new Router()

 //create post
 //http://localhost:3006/api/posts
 //router.post('/',checkAuth, CreatePost)

router.post('/', CreatePost)
//get all posts
 //http://localhost:3006/api/posts
router.get('/', GetAll)
//get post by id
 //http://localhost:3006/api/posts/:id
router.get('/:id', GetbyId)
//get my post
 //http://localhost:3006/api/posts/user/me
 router.get('/user/me', GetMyPosts);
//delete post
router.get('/del/:id',removePost)
//update post
router.put('/:id',updatePost)

router.get('/comments/:id',getPostComments)


 export default router