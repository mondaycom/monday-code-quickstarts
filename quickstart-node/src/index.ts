import express, { Express } from 'express';
import dotenv from 'dotenv';
import authRouter from '@routes/auth.route';
import errorHandler from '@middlewares/error.middleware';
import cookieParser from 'cookie-parser';
import mondayRouter from '@routes/monday.route';
import queueRouter from '@routes/queue';
import mailRouter from '@routes/mail.route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

// Routes
app.use('/auth', authRouter);
app.use('/monday', mondayRouter);
app.use('/queue', queueRouter);
app.use('/mail', mailRouter);

// This middleware should always be the last middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
