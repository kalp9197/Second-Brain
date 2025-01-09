import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter  from './routes/userRouter.js';
import brainRouter  from './routes/brainRouter.js';
import connectDB from './db/db.js';

const a= 10
const app = express();
dotenv.config();
connectDB()

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello');
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/brain', brainRouter);

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
});