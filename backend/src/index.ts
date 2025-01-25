import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter  from './routes/userRouter.js';
import shareRouter  from './routes/shareRouter.js';
import CookieParser from 'cookie-parser';
import connectDB from './db/db.js';

const app = express();
dotenv.config();
connectDB()

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(CookieParser());
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/share', shareRouter);

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
});