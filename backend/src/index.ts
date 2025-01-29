import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import shareRouter from './routes/shareRouter.js';
import CookieParser from 'cookie-parser';
import connectDB from './db/db.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));

app.use(express.json());
app.use(CookieParser());

app.get('/', (req, res) => {
    res.send('hello');
});

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/share', shareRouter);

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`);
});
