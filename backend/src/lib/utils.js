import jwt from 'jsonwebtoken';

export const generateToken  = (userId,res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '7d',
    });


    //Sending the Token as a Cookie named jwt

    res.cookie('jwtCookie', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true,   // The cookie cannot be accessed from client-side JavaScript
        secure: process.env.NODE_ENV === 'development', // Use secure cookies in production
        sameSite: 'strict', // Helps prevent CSRF attacks
        //Prevents the browser from sending the cookie along with cross-site requests 
    });

    return token;
}

//The browser automatically stores the JWT token as a cookie
//This cookie is automatically included with future requests to protected routes.