import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import {connectDB} from './lib/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
//brings in the Express library, which is a toolkit for building web servers and APIs in Node.js.

const PORT = process.env.PORT 


// Increase payload size limit 
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));


app.use(express.json());
//This middleware allows your server to automatically parse JSON data sent in HTTP request bodies (like from POST requests).

app.use(cookieParser());
//Express middleware that parses cookies attached to the client’s HTTP requests.
//It makes it easy to read, set, and manage cookies in your Express app.



app.use(
    cors({
        origin: "http://localhost:5173", 
        credentials: true, // Allows cookies to be sent with requests
    })
);

app.use('/api/auth', authRoutes);
//If you define router.post('/login') in authRoutes, the real endpoint is /api/auth/login.

app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
    connectDB(); 
    //This connects to the MongoDB database using the connection string defined in your .env file.	
    //This starts your server and tells it to listen for incoming HTTP requests on port 5001.

});