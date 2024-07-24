//декомпозиция для роутов 
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'


//register user регистрация
 export const register = async (req,res)=>{
    try{
        const{username, password} =req.body
        const isUsed= await User.findOne({username})

        if (isUsed)
            {
                return  res.status(400).json({
                    message:'Данный username уже занят.Регистрация пользователя невозможна'
                })
            }
            if (!username || !password) {
                return res.status(400).json({
                    message: 'Необходимо заполнить все обязательные поля (username и password).'
                });
            }
        const salt= bcrypt.genSaltSync(10)
        const hash=bcrypt.hashSync(password,salt)
        const newUser= new User({username,password:hash})
        const token= jwt.sign(
            {
            id: newUser._id,
           }, 
           process.env.JWT_SECRET,
           {expiresIn: '90d',
            algorithm: 'HS256'
           },
           
        )
        await newUser.save()
        res.json({newUser, message:'Регистрация прошла успешно',})
        
      }  catch(error){
        res.json({message:'Ошибка при создании пользователя.'})
      } 
 }

//login user авторизация
export const login = async (req,res)=>{
    try{
        const {username, password} =req.body
        const user= await User.findOne({username})
        if (!user)
            {
                return res.status(400).json({
                    message:'Такого пользоветеля не существует'
                })
            }
        const isPasscorretly = await bcrypt.compare(password, user.password)
        if(!isPasscorretly)
            {
                return res.status(400).json({
                    message:'Введен неверный пароль'
                })
            }
            //защита роутов для доступа, не вошли в посты, не можем добавлять посты
       const token= jwt.sign(
        {
        id: user._id,
       }, 
       process.env.JWT_SECRET,
       {expiresIn: '90d'},
    )
       res.json({
        token,user,message:'Вы вошли в систему.',
       })


        }  catch(error){
        res.json({message:'Ошибка при авторизации.'})
      } 
 }

//get me получение профиля
export const getme = async (req,res)=>{
    try{
        //проверка а есть ли такой токен?
        const user =await User.findById(req.userId)
        if(!user)
            {
                return res.status(400).json({
                    message:'Такого токена не существует'
                })
            }
            const token= jwt.sign(
                {
                id: user._id,
               }, 
               process.env.JWT_SECRET,
               {expiresIn: '90d'},
            )
            res.json({
                user,token,
            })

    }  catch(error){
    if ( !res.headersSent)
         return res.json({message:'Нет доступа3'});
    }

}