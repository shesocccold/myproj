import {Router} from 'express'
import { createComment } from '../controllers/comment.js'
const router =new Router()


//create comment
router.post('/comments/:id',createComment)
export default router