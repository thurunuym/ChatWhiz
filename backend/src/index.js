import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import {connectDB} from './lib/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
//brings in the Express library, which is a toolkit for building web servers and APIs in Node.js.

const PORT = process.env.PORT 

app.use(express.json());
//This middleware allows your server to automatically parse JSON data sent in HTTP request bodies (like from POST requests).

app.use(cookieParser());
//Express middleware that parses cookies attached to the client’s HTTP requests.
//It makes it easy to read, set, and manage cookies in your Express app.

app.use('/api/auth', authRoutes);
//If you define router.post('/login') in authRoutes, the real endpoint is /api/auth/login.

app.use('/api/message', messageRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
    connectDB(); 
    //This connects to the MongoDB database using the connection string defined in your .env file.	
    //This starts your server and tells it to listen for incoming HTTP requests on port 5001.

});