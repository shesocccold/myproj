import {Router} from 'express'
import {register, login, getme} from '../controllers/auth.js'
//import { checkAuth } from '../utils/checkAuth.js'
 const router =new Router()

 //register 
 //http://localhost:3006/api/auth/register
router.post('/register', register)
 //login
 //http://localhost:3000/api/auth/login
 router.post('/login', login)

 /// get me
  //http://localhost:3000/api/auth/me
router.get('/me', getme)

 export default router