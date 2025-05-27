import express from 'express';
import authRoutes from './routes/auth.route.js';

const app = express();
//brings in the Express library, which is a toolkit for building web servers and APIs in Node.js.

app.use('/api/auth', authRoutes);
//If you define router.post('/login') in authRoutes, the real endpoint is /api/auth/login.


app.listen(5001, () => {
    console.log("Server is running on port 5001");
    //This starts your server and tells it to listen for incoming HTTP requests on port 5001.
});