import jwt from 'jsonwebtoken'

export const checkAuth=(req, res, next) => {
 const token=(req.headers.authorization|| '').replace(/Bearer\s?/,'')

   if (token){
        try{
            const decoded= jwt.verify(token, process.env.JWT_SECRET)
            req.userId=decoded.userId
            next()
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Неверный токен' });
            } else if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Токен истек' });
            } else {
                console.error('Ошибка при верификации токена:', error);
                return res.status(500).json({ message: 'Произошла ошибка при авторизации' });
            }
        }
    } else {
        return res.status(401).json({ message: 'Отсутствует токен авторизации' });
    }

    }
